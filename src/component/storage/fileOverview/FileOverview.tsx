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
import { toggleFileOverviewScrollIndicator } from '../../../lib/redux/slice/dropdownOptions';
import { setScrollFinished } from '../../../lib/redux/slice/fileStorageScroll';
import UserFileCreatorName from './userFileCreatorName/UserFileCreatorName';

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
    const { checkedTypedEntities } = useAppSelector(state => state.checkedEntities);
    const { signalScroll, scrollTargetId } = useAppSelector(state => state.fileStorageScroll);

    function fileSort(chunkRefs: Chunk[]): Chunk[] {
        return [...chunkRefs].sort((a, b) => (a.originalFileName).localeCompare(b.originalFileName));
    }

    function dirSort(subdirectories: Directory[]): Directory[] {
        return [...subdirectories].sort((a, b) => (a.name).localeCompare(b.name));
    }


    // scrolling
    useEffect(() => {
        if (!scrollTargetId || !signalScroll) return;

        const targetElement = document.querySelector(`#${scrollTargetId}`);

        if (!targetElement) return;

        targetElement.scrollIntoView({ block: "center", inline: "nearest", behavior: 'instant' });
        targetElement.classList.add('pulse-to-identify');
        setTimeout(() => {
            targetElement.classList.remove('pulse-to-identify');
            dispatch(setScrollFinished());
        }, 2000);
    }, [scrollTargetId, signalScroll]);


    // selection functionality
    const checkboxManipulatorsList = useRef<SelectorManipulationObject[]>([]);
    const masterCheckboxManipulator = useRef<SelectorManipulationObject | null>(null);
    function addToCheckedList(entity: CheckedEntityActionPayload) {
        if (!entity || entity?.entityId <= 0 || !entity?.entityType) return;
        dispatch(addEntityToCheckedList(entity));
        dispatch(setCheckedEntitiesRenderOptions({
            delete: parrentComponent === 'SharedWithMe' ? false : true,
            download: true,
            currentView: parrentComponent
        }));
    }
    function removeFromCheckedList(entity: CheckedEntityActionPayload) {
        if (!entity || entity?.entityId <= 0 || !entity?.entityType) return;
        dispatch(deleteEntityFromCheckedList(entity));
    }
    function removeSelectorManipulatorObjectFromList(forEntity: CheckedEntityActionPayload) {
        checkboxManipulatorsList.current = checkboxManipulatorsList.current.reduce((acc, cur) => {
            if (cur.entity.entityId === forEntity.entityId && cur.entity.entityType === forEntity.entityType) {
                return acc;
            }
            acc.push(cur);
            return acc;
        }, [] as SelectorManipulationObject[]);
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
        const allRenderedEntities = [
            ...(subdirectories || []).map(d => ({ entityId: d.id, entityType: 'directory' })),
            ...(hydratedChunks || []).map(c => ({ entityId: c.id, entityType: 'chunk' }))
        ];
        if (allRenderedEntities.length == 0) {
            masterCheckboxManipulator.current?.uncheck();
            return;
        }
        const notCheckedCount = allRenderedEntities.length - checkedTypedEntities.length;
        notCheckedCount == 0 ? masterCheckboxManipulator.current?.check() : masterCheckboxManipulator.current?.uncheck();
    }

    useEffect(() => {
        areAllSelectorsChecked();
    }, [checkedTypedEntities]);
    useEffect(() => {
        if (!newlyDeletedSubdirs) return;
        newlyDeletedSubdirs.forEach(dirId => {
            const entityToRemove = {
                entityId: dirId || 0,
                entityType: 'directory'
            } as CheckedEntityActionPayload;
            removeFromCheckedList(entityToRemove);
            removeSelectorManipulatorObjectFromList(entityToRemove);
        });
    }, [newlyDeletedSubdirs]);
    useEffect(() => {
        if (!newlyDeletedChunks) return;
        newlyDeletedChunks.forEach(chunkId => {
            const entityToRemove = {
                entityId: chunkId || 0,
                entityType: 'chunk'
            } as CheckedEntityActionPayload;
            removeFromCheckedList(entityToRemove);
            removeSelectorManipulatorObjectFromList(entityToRemove);
        });
    }, [newlyDeletedChunks]);



    function fileMapper(chunk: Chunk) {
        return (
            <div className="file-row" key={chunk.id} id={`scroll-to-id-${chunk.id}`}>
                <div className="file-col selector">
                    <SelectRing
                        HTMLInputElementId={`select-ring-chunk-input-${chunk.id.toString()}`}
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
                        {parrentComponent === 'SharedWithMe' ?
                            <UserFileCreatorName ownerId={chunk.ownerId} />
                            : getFormatedDate(chunk.createdOn)}
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
                        HTMLInputElementId={`select-ring-directory-input-${dir.id.toString()}`}
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

    function scrollListrener() {
        dispatch(toggleFileOverviewScrollIndicator());
    }

    return (
        <div id="file-overview-main-container">

            <div className="file-table-wrapper anime-fade-in">
                <div className="file-table" onScroll={scrollListrener}>
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
                        <div title="The name of the file or directory" className="file-col name">Name</div>
                        <div title="The size of the file or the count of the contained elements of the directory" className="file-col size">Size</div>
                        <div
                            title={parrentComponent === 'SharedWithMe' ? 'Creator of the file' : 'Time of creation'}
                            className="file-col created">
                            {parrentComponent === 'SharedWithMe' ? 'Creator' : 'Created'}
                        </div>
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