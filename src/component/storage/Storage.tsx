import './storage.sass';

import NavBar from '../base/navBar/NavBar';
import SideOptions from './sideOptions/SideOptions';
import UploadProgressViewer from './uploadProgressViewer/UploadProgressViewer';
import TextInputBox from '../global/textInputBox/TextInputBox';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Outlet } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/redux/reduxTypedHooks';
import { validateFileAndDirName } from '../../lib/util/validator';
import fetcher from '../../lib/action/fetcher';
import { createDirectoryRequest } from '../../lib/action/fileSystem/directoryRequest';
import { setDirPath, setNewAddedFile, setNewlyAddedDir } from '../../lib/redux/slice/directory';
import type { UploadProgressEntity } from '../../lib/definition/redux';
import fileUpload from '../../lib/action/fileUpload';
import { addUploadEntity, removeUploadEntityById, updateUploadEntityById } from '../../lib/redux/slice/uploadProgress';
import type { FetcherReturn } from '../../lib/definition/fetcherReturn';
import type { Chunk } from '../../lib/definition/chunk';
import type { Directory } from '../../lib/definition/directory';


export default function Storage() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const { dirPath } = useAppSelector(state => state.directory);
    const uploadProgress = useAppSelector(state => state.uploadProgress);

    const [sideOptionsDisplay, setSideOptionsDisplay] = useState(false);
    const [isDirectoryDialog, setDirectoryDialog] = useState(false);

    const storageFileUploadRef = useRef(null);
    const fileUploadIdRef = useRef(0);

    useEffect(() => {
        dispatch(setDirPath([[user.id, 'My Storage']]));
    }, []);

    function toggleSideOptionsDisplay() {
        setSideOptionsDisplay(state => !state);
    }


    // new directory addition
    function openAddDirectoryDialog() {
        setDirectoryDialog(true);
    }
    function closeAddDirectoryDialog() {
        setDirectoryDialog(false);
    }
    async function addNewDirectory(newDirName: string) {
        const res = await fetcher(
            createDirectoryRequest(
                dirPath[dirPath.length - 1][0],
                newDirName
            )
        );
        if (res.status == 200) {
            // trigger refresh in my-storage
            dispatch(setNewlyAddedDir(res.payload as Directory));
        }
    }


    // strorage file upload
    function triggerStorageFileUploadDialog() {
        (storageFileUploadRef.current! as HTMLInputElement)?.click();
    }
    function storageFileUpload(e: ChangeEvent) {
        const input = (e.currentTarget as HTMLInputElement);
        const fileList = Object.values(input.files || {});
        for (let i = 0; i < fileList.length; i++) {
            const file: File = fileList[i];
            const fileUploadData = new FormData();
            fileUploadData.append('file', file);
            fileUploadData.append('targetDirectoryId', dirPath[dirPath.length - 1][0].toString());

            const uploadProgressEntity: UploadProgressEntity = {
                id: getFileUploadId(),
                fileName: file.name,
                actionInProgress: 'Uploading...',
                progress: 0
            };
            const progressTracker = uploadProgressTrackerFactory(uploadProgressEntity);

            dispatch(addUploadEntity(uploadProgressEntity));

            fileUpload(fileUploadData, progressTracker)
                .then(res => {
                    dispatch(removeUploadEntityById(uploadProgressEntity.id));
                    dispatch(setNewAddedFile((res as FetcherReturn).payload as Chunk));
                });
        }
        input.value = '';
    }
    function getFileUploadId() {
        const id = fileUploadIdRef.current;
        fileUploadIdRef.current += 1;
        return id;
    }
    function uploadProgressTrackerFactory(uploadProgressEntity: UploadProgressEntity) {
        return (progress: number) => {
            uploadProgressTracker(uploadProgressEntity.id, progress);
        }
    }
    function uploadProgressTracker(
        id: number,
        progress: number
    ) {
        dispatch(updateUploadEntityById({
            id,
            progress,
            actionInProgress: progress >= 100 ? 'Confirming...' : 'Uploading...'
        }));
    }
    function testUploadStateView() {
        console.log('uploadProgress', uploadProgress);

    }

    return (
        <>
            <NavBar />
            <div className="wrapper anime-fade-in">
                <section id="storageSideOptionsContainer">
                    <div className="dropdown">
                        <button id="storageAddNewBtn" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-plus-lg"></i>
                            Add New
                        </button>

                        <ul className="dropdown-menu custom-dropdown">
                            <li>
                                <span className="dropdown-item" onClick={openAddDirectoryDialog}>
                                    <i className="bi bi-folder2"></i>
                                    Directory
                                </span>
                            </li>
                            <div className="custom-horizontal-divider"></div>
                            <li>
                                <span className="dropdown-item" onClick={triggerStorageFileUploadDialog}>
                                    <input ref={storageFileUploadRef} multiple onChange={storageFileUpload} type="file" name="storage-file-upload" id="storage-file-upload" />
                                    <i className="bi bi-file-earmark-arrow-up"></i>
                                    Upload File
                                </span>
                            </li>
                            <li>
                                <span className="dropdown-item" onClick={() => testUploadStateView()}>
                                    <i className="bi bi-file-earmark-arrow-up"></i>
                                    Test update upload
                                </span>
                            </li>
                        </ul>
                    </div>
                    <button id="storageSideOptionsBtn" onClick={toggleSideOptionsDisplay} className="custom-btn secondary-btn" type="button">More</button>
                    <SideOptions
                        sideOptionsDisplay={sideOptionsDisplay}
                        sideOptionsDisplayToggler={toggleSideOptionsDisplay} />
                </section>
                <section id="storageFileOverviewContainer" className="flex-col-strech-wrapper">
                    <Outlet />
                </section>
                {
                    isDirectoryDialog ? <TextInputBox
                        funcToRunOnInputDone={addNewDirectory}
                        funcToClose={closeAddDirectoryDialog}
                        funcInputValueValidator={validateFileAndDirName}
                        textContent='New Directory Name'
                        textExtraNote='Can not contain: < > : " / \ | ? *'
                        btnText='Add Directory' /> : ''
                }
                <UploadProgressViewer />
            </div>
        </>
    );
}