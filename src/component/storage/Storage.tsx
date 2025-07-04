import './storage.sass';

import NavBar from '../base/navBar/NavBar';
import SideOptions from './sideOptions/SideOptions';
import UploadProgressViewer from './uploadProgressViewer/UploadProgressViewer';
import TextInputBox from '../global/textInputBox/TextInputBox';
import ShareInterface from '../global/share/shareInterface/ShareInterface';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Outlet } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/redux/reduxTypedHooks';
import { setDirPath, addChunk } from '../../lib/redux/slice/directory';
import type { UploadProgressEntity } from '../../lib/definition/redux';
import fileUpload from '../../lib/action/fileUpload';
import { addUploadEntity, removeUploadEntityById, updateUploadEntityById } from '../../lib/redux/slice/uploadProgress';
import type { FetcherReturn } from '../../lib/definition/fetcherReturn';
import type { Chunk } from '../../lib/definition/chunk';
import { setMessage } from '../../lib/redux/slice/messenger';
import CheckedEntitiesOptions from './view/myStorage/checkedEntitiesOptions/CheckedEntitiesOptions';
import { addBytesInStorage } from '../../lib/redux/slice/user';
import { openTextInputBox } from '../../lib/redux/slice/textInputBox';


export default function Storage() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const { dirPath } = useAppSelector(state => state.directory);
    const { checkedList } = useAppSelector(state => state.checkedEntities);

    const [sideOptionsDisplay, setSideOptionsDisplay] = useState(false);

    const storageFileUploadRef = useRef(null);
    const fileUploadIdRef = useRef(0);

    useEffect(() => {
        if (!user) return;
        dispatch(setDirPath([[user.rootStorageDir, 'My Storage']]));
    }, []);

    function toggleSideOptionsDisplay() {
        setSideOptionsDisplay(state => !state);
    }


    // new directory addition
    function openAddDirectoryDialog() {
        dispatch(openTextInputBox({
            funcToRunOnInputDone: 'addNewDirectory',
            funcInputValueValidator: 'validateFileAndDirName',
            textContent: 'New Directory Name',
            textExtraNote: 'Can not contain: < > : " / \\ | ? *',
            btnText: 'Create'
        }));
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
            if (file.type == "") {
                dispatch(setMessage({
                    title: 'Invalid file',
                    text: `File type/extention is invalid. File: ${file.name}`,
                    type: 'negative',
                    duration: 7000
                }));
                continue;
            }
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
                    if ((res as FetcherReturn).status === 200) {
                        dispatch(removeUploadEntityById(uploadProgressEntity.id));
                        dispatch(addChunk((res as FetcherReturn).payload as Chunk));
                        dispatch(addBytesInStorage(((res as FetcherReturn).payload as Chunk).sizeBytes));
                    } else {
                        dispatch(removeUploadEntityById(uploadProgressEntity.id));
                        dispatch(setMessage({
                            title: 'Ooops...',
                            text: (res as FetcherReturn)?.msg || 'A problem occurred. Please try again.',
                            type: 'negative',
                            duration: 5000
                        }));
                    }
                })
                .catch(rej => {
                    dispatch(removeUploadEntityById(uploadProgressEntity.id));
                    dispatch(setMessage({
                        title: 'Ooops...',
                        text: (rej as FetcherReturn)?.msg || 'A problem occurred. Please try again.',
                        type: 'negative',
                        duration: 5000
                    }));
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


    // checked entities options display
    const [displayCheckedEntitiesOptions, setDisplayCheckedEntitiesOptions] = useState(false);
    useEffect(() => {
        setDisplayCheckedEntitiesOptions(checkedList.length > 0);
    }, [checkedList]);


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
                        </ul>
                    </div>
                    <button id="storageSideOptionsBtn" onClick={toggleSideOptionsDisplay} className="custom-btn secondary-btn" type="button">More</button>
                    <SideOptions
                        sideOptionsDisplay={sideOptionsDisplay}
                        sideOptionsDisplayToggler={toggleSideOptionsDisplay} />
                </section>
                <section id="storageFileOverviewContainer" className="flex-col-strech-wrapper">
                    <div className="storage-checked-entities-container">
                        {
                            displayCheckedEntitiesOptions ?
                                <CheckedEntitiesOptions /> : ''
                        }
                    </div>
                    <Outlet context={storageFileUploadRef} />
                </section>
                <TextInputBox/>
                <UploadProgressViewer />
                <ShareInterface />
            </div>
        </>
    );
}