import './fileOverview.sass';

import type { Chunk } from '../../../lib/definition/chunk';

import { getFormatedDate, getFormatedFileSize, getIconElement } from '../../../lib/util/file';

import FileOptionsDropdown from './optionsDropdown/FileOptionsDropdown';
import SelectRing from './selectRing/SelectRing';
import EmptyDirectory from './emptyDirectory/EmptyDirectory';
import DirectoryOptionsDropdown from './optionsDropdown/DirectoryOptionsDropdown';

import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { setDirPath } from '../../../lib/redux/slice/directory';
import type { Directory } from '../../../lib/definition/directory';
import { pushToHistory } from '../../../lib/redux/slice/breadcrumbs';
import { useEffect, useRef } from 'react';
import type { SelectorManipulationObject } from '../../../lib/definition/selectRing';
import { addEntityToCheckedList, clearCheckedList, deleteEntityFromCheckedList, setCheckedEntitiesRenderOptions } from '../../../lib/redux/slice/checkedEntities';
import type { FileOptionsDropdownOptionsToRender } from '../../../lib/definition/fileOptionsDropdownTypes';
import type { CheckedEntityActionPayload } from '../../../lib/definition/checkedEntitiesOptionsTypes';

export default function FileOverview({
    subdirectories,
    hydratedChunks,
    displayEntities,
    emptyDirectoryTextContent = 'Empty Directory.',
    emptyDirectoryIcon = 'directory',
    fileOptionsToRender,
    parrentComponent
}: {
    subdirectories?: Directory[],
    hydratedChunks: Chunk[],
    displayEntities: 'all' | 'filesOnly',
    emptyDirectoryTextContent?: string,
    emptyDirectoryIcon?: 'directory' | 'file',
    fileOptionsToRender: FileOptionsDropdownOptionsToRender,
    parrentComponent?: 'SharedWithMe'
}) {
    const dispatch = useAppDispatch();
    const { dirPath, newlyDeletedSubdirs, newlyDeletedChunks } = useAppSelector(state => state.directory);
    const { checkedList } = useAppSelector(state => state.checkedEntities);

    function fileSort(chunkRefs: Chunk[]): Chunk[] {
        return [...chunkRefs].sort((a, b) => (a.originalFileName).localeCompare(b.originalFileName));
    }

    function dirSort(subdirectories: Directory[]): Directory[] {
        return [...subdirectories].sort((a, b) => (a.name).localeCompare(b.name));
    }



    // selection functionality
    const checkboxManipulatorsList = useRef<SelectorManipulationObject[]>([]);
    const masterCheckboxManipulator = useRef<SelectorManipulationObject | null>(null);
    function addToCheckedList(entity: CheckedEntityActionPayload) {
        if (!entity || entity?.entityId <= 0 || !entity?.entityType) return;
        dispatch(addEntityToCheckedList(entity));
        dispatch(setCheckedEntitiesRenderOptions({
            delete: parrentComponent === 'SharedWithMe' ? false : true,
            download: true
        }));
    }
    function removeFromCheckedList(entity: CheckedEntityActionPayload) {
        if (!entity || entity?.entityId <= 0 || !entity?.entityType) return;
        dispatch(deleteEntityFromCheckedList(entity));
    }
    function removeSelectorManipulatorObjectFromList(idOfEntityToRemove: number) {
        checkboxManipulatorsList.current = checkboxManipulatorsList.current.filter(obj => obj.entity.entityId !== idOfEntityToRemove);
    }
    function addSelectorManipulationObjectList(selectorManipulationObject: SelectorManipulationObject) {
        if (!selectorManipulationObject) return;
        checkboxManipulatorsList.current.push(selectorManipulationObject);
    }
    function addMasterSelectorManipulationObject(selectorManipulationObject: SelectorManipulationObject) {
        if (!selectorManipulationObject) return;
        masterCheckboxManipulator.current = selectorManipulationObject;
    }
    function selectAllInDirectory() {
        checkboxManipulatorsList.current.forEach(manipulator => {
            manipulator.check();
            addToCheckedList(manipulator.entity);
        });
    }
    function unselectAllInDirectory() {
        checkboxManipulatorsList.current.forEach(manipulator => manipulator.uncheck());
        dispatch(clearCheckedList());
    }
    function areAllSelectorsChecked() {
        const allIds = new Set([
            ...(subdirectories || []).map(d => d.id),
            ...(hydratedChunks || []).map(c => c.id)
        ]);
        if (allIds.size == 0) {
            masterCheckboxManipulator.current?.uncheck();
            return;
        }
        const notCheckedCount = allIds.difference(new Set(checkedList)).size;
        notCheckedCount == 0 ? masterCheckboxManipulator.current?.check() : masterCheckboxManipulator.current?.uncheck();
    }

    useEffect(() => {
        areAllSelectorsChecked();
    }, [checkedList]);
    useEffect(() => {
        if (!newlyDeletedSubdirs) return;
        newlyDeletedSubdirs.forEach(dirId => {
            removeFromCheckedList({
                entityId: dirId || 0,
                entityType: 'directory'
            });
            removeSelectorManipulatorObjectFromList(dirId || 0);
        }); 
    }, [newlyDeletedSubdirs]);
    useEffect(() => {
        if (!newlyDeletedChunks) return;
        newlyDeletedChunks.forEach(chunkId => {
            removeFromCheckedList({
                entityId: chunkId || 0,
                entityType: 'chunk'
            });
            removeSelectorManipulatorObjectFromList(chunkId || 0);    
        }); 
    }, [newlyDeletedChunks]);



    function fileMapper(chunk: Chunk) {
        return (
            <div className="file-row" key={chunk.id}>
                <div className="file-col selector">
                    <SelectRing
                        HTMLInputElementId={`select-ring-input-${chunk.id.toString()}`}
                        entityId={chunk.id}
                        entityType='chunk'
                        addToCheckedList={addToCheckedList}
                        removeFromCheckedList={removeFromCheckedList}
                        addSelectorManipulationObject={addSelectorManipulationObjectList} />
                </div>
                <div className="file-col type">
                    {getIconElement(chunk.mimeType)}
                </div>
                <div className="file-col name">
                    <div className="name-text-content-container">
                        <a className="text-content" href={
                            parrentComponent === 'SharedWithMe' ?
                                `/api/file-sharing/file?fileId=${chunk.id}`
                                : `/api/file/${chunk.id}`
                        } download={chunk.originalFileName}>
                            {chunk.originalFileName}
                        </a>
                    </div>
                    <FileOptionsDropdown
                        chunk={chunk}
                        fileOptionsToRender={fileOptionsToRender}
                        downloadFileSharedWithMe={parrentComponent === 'SharedWithMe'} />
                </div>
                <div className="file-col size">
                    <p className="text-content">
                        {getFormatedFileSize(chunk.sizeBytes)}
                    </p>
                </div>
                <div className="file-col created">
                    <p className="text-content">
                        {getFormatedDate(chunk.createdOn)}
                    </p>
                </div>
            </div>
        );
    }

    function goToNextDir(dirPathEntry: [number, string]) {
        const newDirPath = [...dirPath, dirPathEntry];
        dispatch(pushToHistory(newDirPath));
        dispatch(setDirPath(newDirPath));
        dispatch(clearCheckedList());
    }

    function directoryMapper(dir: Directory) {
        return (
            <div className="file-row" key={dir.id}>
                <div className="file-col selector">
                    <SelectRing
                        HTMLInputElementId={`select-ring-input-${dir.id.toString()}`}
                        entityId={dir.id}
                        entityType='directory'
                        addToCheckedList={addToCheckedList}
                        removeFromCheckedList={removeFromCheckedList}
                        addSelectorManipulationObject={addSelectorManipulationObjectList} />
                </div>
                <div className="file-col type">
                    {getIconElement('directory')}
                </div>
                <div className="file-col name">
                    <div className="name-text-content-container">
                        <p className="text-content" onClick={() => goToNextDir([dir.id, dir.name])}>
                            {dir.name}
                        </p>
                    </div>
                    <DirectoryOptionsDropdown directory={dir} />
                </div>
                <div className="file-col size">
                    <p className="text-content">
                        {dir.elementsCount} Elements
                    </p>
                </div>
                <div className="file-col created">
                    <p className="text-content">
                        {getFormatedDate(dir.createdOn)}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div id="file-overview-main-container">

            <div className="file-table-wrapper anime-fade-in">
                <div className="file-table">
                    <div className="file-table-header">
                        <div className="file-col selector">
                            <SelectRing
                                HTMLInputElementId="select-ring-input-all-checkbox-elements"
                                selectAllInDirectory={selectAllInDirectory}
                                unselectAllInDirectory={unselectAllInDirectory}
                                addMasterSelectorManipulationObject={addMasterSelectorManipulationObject} />
                        </div>
                        <div className="file-col type">
                            <i className="bi bi-file-earmark"></i>
                        </div>
                        <div className="file-col name">Name</div>
                        <div className="file-col size">Size</div>
                        <div className="file-col created">Created</div>
                    </div>

                    <div className="file-table-body">
                        {
                            displayEntities == 'all' ?

                                (
                                    (hydratedChunks || []).length == 0 && Object.entries(subdirectories || []).length == 0 ? <EmptyDirectory
                                        textContent={emptyDirectoryTextContent}
                                        icon={emptyDirectoryIcon} /> :
                                        <>
                                            {
                                                dirSort(subdirectories || []).map(directoryMapper)
                                            }
                                            {
                                                fileSort(hydratedChunks || []).map(fileMapper)
                                            }
                                        </>
                                )

                                :

                                (
                                    (hydratedChunks || []).length == 0 ? <EmptyDirectory
                                        textContent={emptyDirectoryTextContent}
                                        icon={emptyDirectoryIcon} /> : fileSort(hydratedChunks || []).map(fileMapper)
                                )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}