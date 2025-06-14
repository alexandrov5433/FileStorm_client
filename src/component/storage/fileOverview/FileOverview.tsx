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

export default function FileOverview({
    subdirectories,
    hydratedChunks,
    displayEntities,
    emptyDirectoryTextContent = 'Empty Directory.',
    emptyDirectoryIcon = 'directory'
}: {
    subdirectories?: Directory[] | null,
    hydratedChunks: Chunk[] | null,
    displayEntities: 'all' | 'filesOnly',
    emptyDirectoryTextContent?: string,
    emptyDirectoryIcon?: 'directory' | 'file'
}) {
    const dispatch = useAppDispatch();
    const { dirPath } = useAppSelector(state => state.directory);

    function fileSort(chunkRefs: Chunk[]): Chunk[] {
        return chunkRefs.sort((a, b) => (a.originalFileName).localeCompare(b.originalFileName));
    }

    function dirSort(subdirectories: Directory[]): Directory[] {
        return subdirectories.sort((a, b) => (a.name).localeCompare(b.name));
    }

    function fileMapper(chunk: Chunk) {
        return (
            <div className="file-row" key={chunk.id}>
                <div className="file-col selector">
                    <SelectRing entityMarker={chunk.id.toString()} />
                </div>
                <div className="file-col type">
                    {getIconElement(chunk.mimeType)}
                </div>
                <div className="file-col name">
                    <a className="text-content" href={`/api/file?fileId=${chunk.id}`} download={chunk.originalFileName}>
                        {chunk.originalFileName}
                    </a>
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
        dispatch(setDirPath([...dirPath, dirPathEntry]));
    }

    function directoryMapper(dir: Directory) {
        return (
            <div className="file-row" key={dir.id}>
                <div className="file-col selector">
                    <SelectRing entityMarker={dir.id.toString()} />
                </div>
                <div className="file-col type">
                    {getIconElement('directory')}
                </div>
                <div className="file-col name">
                    <p className="text-content" onClick={() => goToNextDir([dir.id, dir.name])}>
                        {dir.name}
                    </p>
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
                            <SelectRing entityMarker="all" />
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