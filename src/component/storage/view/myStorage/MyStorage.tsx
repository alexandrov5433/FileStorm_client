import './myStorage.sass';

import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

import { useEffect, useRef, useState } from 'react';
import fetcher from '../../../../lib/action/fetcher';
import { getDirectoryRequest } from '../../../../lib/action/fileSystem/directoryRequest';
import type { HydratedDirectory } from '../../../../lib/definition/hydratedDirectory';
import type { Chunk } from '../../../../lib/definition/chunk';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import type { Directory } from '../../../../lib/definition/directory';
import useDragAndDropListenerHook from '../../../../lib/hook/useDragAndDrop';
import { useOutletContext } from 'react-router';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import { setDirPath } from '../../../../lib/redux/slice/directory';
import { goBackOne, goForwardOne, initHistory } from '../../../../lib/redux/slice/breadcrumbs';

export default function MyStorage() {
    const { dirPath, newlyDeletedDirId, newlyAddedDir, newlyDeletedFileId, newlyAddedFile } = useAppSelector(state => state.directory);
    const user = useAppSelector(state => state.user);
    const breadcrumbsState = useAppSelector(state => state.breadcrumbs);
    const dispatch = useAppDispatch();

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
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    useDragAndDropListenerHook(
        myStorageMainContainerRef.current!,
        dragoverStylingToggler,
        onDropInsertIntoInput
    );


    
    // breadcrumbs navigation with browser back/forward buttons functionality
    const backButtonClickRef = useRef(false);
    const historyInitDoneRef = useRef(false);
    const breadcrumbsStateRef = useRef(breadcrumbsState);
    useEffect(() => {
        window.addEventListener('popstate', testBackButton);
        return () => window.removeEventListener('popstate', testBackButton);
    }, []);

    function testBackButton(e: PopStateEvent) {
        backButtonClickRef.current = true;
        const previousPosition = breadcrumbsStateRef.current.currentPosition;
        const newPosition = typeof e.state === 'number' ? e.state : null;
        
        if (newPosition == null || !previousPosition) {
            const historyTarget = breadcrumbsStateRef.current.windowHistoryLengthOnAppEntry! - window.history.length; 
            history.go(historyTarget);
            return;
        }
        e.preventDefault();
        if (newPosition < previousPosition) {
            dispatch(goBackOne());
        } else if (newPosition > previousPosition) {
            dispatch(goForwardOne());
        }
    }

    useEffect(() => {
        if (backButtonClickRef.current) {
            backButtonClickRef.current = false;
            dispatch(setDirPath(breadcrumbsState.history?.[breadcrumbsState.currentPosition || 0] || [[user?.id || 0, 'My Storage']]));
        } else {
            window.history.pushState(breadcrumbsState.currentPosition || 0, '', window.location.pathname);
        }
        breadcrumbsStateRef.current = breadcrumbsState;
    }, [breadcrumbsState]);

    useEffect(() => {
        if (!historyInitDoneRef.current && dirPath.length) {
            dispatch(initHistory(dirPath));
            historyInitDoneRef.current = true;
            window.history.pushState(0, '', window.location.pathname);
        }
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

    return (
        <div ref={myStorageMainContainerRef} id="my-storage-main-container" className={`flex-col-strech-wrapper${isDragover ? ' dragover' : ''}`}>
            <Breadcrumbs />
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

