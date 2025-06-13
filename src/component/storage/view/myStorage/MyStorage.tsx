import './myStorage.sass';

import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

import { useEffect, useRef, useState } from 'react';
import fetcher from '../../../../lib/action/fetcher';
import { getDirectoryRequest } from '../../../../lib/action/fileSystem/directoryRequest';
import type { HydratedDirectory } from '../../../../lib/definition/hydratedDirectory';
import type { Chunk } from '../../../../lib/definition/chunk';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import { setDirPath } from '../../../../lib/redux/slice/directory';
import type { Directory } from '../../../../lib/definition/directory';
import dragAndDropListenerHook from '../../../../lib/hook/dragAndDrop';
import { useOutletContext } from 'react-router';

export default function MyStorage() {
    const dispatch = useAppDispatch();
    const { dirPath, newlyDeletedDirId, newlyAddedDir, newlyDeletedFileId, newlyAddedFile } = useAppSelector(state => state.directory);

    const outletContext = useOutletContext();

    const [subdirectories, setSubdirectories] = useState<Directory[] | null>(null);
    const [hydratedChunks, setHydratedChunks] = useState<Chunk[] | null>(null);

    const [isDirRefLoading, setDirRefLoading] = useState(true);

    // drag and drop file upload functionality
    const myStorageMainContainerRef = useRef(null);
    const [isDragover, setDragover] = useState(false);
    function dragoverStylingToggler(arg: boolean) {
        setDragover(arg);
    };
    function onDropInsertIntoInput(files: FileList) {
        const input = (outletContext as any).current as HTMLInputElement;        
        input.files = files;
        input.dispatchEvent(new Event('change', {bubbles: true}));
    }
    dragAndDropListenerHook(
        myStorageMainContainerRef.current!,
        dragoverStylingToggler,
        onDropInsertIntoInput
    );

    useEffect(() => {
        getDirectoryData();
    }, [dirPath]);

    useEffect(() => {
        if (!newlyAddedDir) return;
        setSubdirectories(state => {
            return [...state || [], newlyAddedDir];
        });
    }, [newlyAddedDir]);

    useEffect(() => {
        if (!newlyDeletedDirId) return;
        setSubdirectories(state => {
            return (state || []).filter(d => d.id != newlyDeletedDirId);
        });
    }, [newlyDeletedDirId]);

    useEffect(() => {
        if (!newlyAddedFile) return;
        setHydratedChunks(state => {
            return [...state || [], newlyAddedFile];
        });
    }, [newlyAddedFile]);

    useEffect(() => {
        if (!newlyDeletedFileId) return;
        setHydratedChunks(state => {
            return (state || []).filter(c => c.id != newlyDeletedFileId);
        });
    }, [newlyDeletedFileId]);

    async function getDirectoryData() {
        setDirRefLoading(true);
        const directoryid = dirPath?.[dirPath.length - 1]?.[0];
        if (directoryid <= 0 || !directoryid) return;
        const res = await fetcher(
            getDirectoryRequest(directoryid)
        );
        if (res.status == 200) {
            setSubdirectories((res.payload as HydratedDirectory).subdirectories || []);
            setHydratedChunks((res.payload as HydratedDirectory).hydratedChunks || []);
        }
        setDirRefLoading(false);
    }

    function breadcrumbMapper(dirPathEntry: [number, string], index: number) {
        return (
            <li key={dirPathEntry[0]} className={`breadcrumb-item${dirPath.length - 1 == index ? ' active' : ''}`} aria-current="page" onClick={() => { goToTargetDir(dirPathEntry[0]) }}>
                {dirPathEntry[1]}
            </li>
        );
    }

    function goToTargetDir(directoryId: number) {
        let dirIndexInDirPath = 0;
        for (let i = 0; i < dirPath.length; i++) {
            const cur = dirPath[i];
            if (cur[0] == directoryId) {
                dirIndexInDirPath = i;
            }
        }

        const targetDirPath = dirPath.slice(0, dirIndexInDirPath + 1);
        dispatch(setDirPath(targetDirPath));
    }

    return (
        <div ref={myStorageMainContainerRef} id="my-storage-main-container" className={`flex-col-strech-wrapper${isDragover ? ' dragover' : ''}`}>
            <section id="my-storage-breadcrumb-container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {dirPath.map(breadcrumbMapper)}
                    </ol>
                </nav>
            </section>
            {
                isDirRefLoading ? <StorageViewLoader /> :
                    <FileOverview
                        subdirectories={subdirectories || []}
                        hydratedChunks={hydratedChunks || []}
                        displayEntities='all'
                    />
            }
            <section className="drag-and-drop-message">
                <h3>Drop File to Upload.</h3>
            </section>
        </div>
    );
}

