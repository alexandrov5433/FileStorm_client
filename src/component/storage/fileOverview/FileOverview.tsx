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
import { addEntityToCheckedList, clearCheckedList, deleteEntityFromCheckedList } from '../../../lib/redux/slice/checkedEntities';

export default function FileOverview({
    subdirectories,
    hydratedChunks,
    displayEntities,
    emptyDirectoryTextContent = 'Empty Directory.',
    emptyDirectoryIcon = 'directory'
}: {
    subdirectories?: Directory[],
    hydratedChunks: Chunk[],
    displayEntities: 'all' | 'filesOnly',
    emptyDirectoryTextContent?: string,
    emptyDirectoryIcon?: 'directory' | 'file'
}) {
    const dispatch = useAppDispatch();
    const { dirPath, newlyDeletedSubdirId, newlyDeletedChunkId } = useAppSelector(state => state.directory);
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
    function addToCheckedList(id: number) {
        if (id <= 0) return;
        dispatch(addEntityToCheckedList(id));
    }
    function removeFromCheckedList(id: number) {
        dispatch(deleteEntityFromCheckedList(id));
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
            addToCheckedList(manipulator.fileOrDirId);
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
        removeFromCheckedList(newlyDeletedSubdirId || 0);
    }, [newlyDeletedSubdirId]);
    useEffect(() => {
        removeFromCheckedList(newlyDeletedChunkId || 0);
    }, [newlyDeletedChunkId]);



    function fileMapper(chunk: Chunk) {
        return (
            <div className="file-row" key={chunk.id}>
                <div className="file-col selector">
                    <SelectRing
                        inputElementId={`select-ring-input-${chunk.id.toString()}`}
                        fileOrDirId={chunk.id}
                        addToCheckedList={addToCheckedList}
                        removeFromCheckedList={removeFromCheckedList}
                        addSelectorManipulationObject={addSelectorManipulationObjectList} />
                </div>
                <div className="file-col type">
                    {getIconElement(chunk.mimeType)}
                </div>
                <div className="file-col name">
                    <div className="name-text-content-container">
                        <a className="text-content" href={`/api/file?fileId=${chunk.id}`} download={chunk.originalFileName}>
                            {chunk.originalFileName}
                        </a>
                    </div>
                    <FileOptionsDropdown chunk={chunk} />
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
                        inputElementId={`select-ring-input-${dir.id.toString()}`}
                        fileOrDirId={dir.id}
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
                    <DirectoryOptionsDropdown directoryId={dir.id} />
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
                                inputElementId="select-ring-input-all-checkbox-elements"
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