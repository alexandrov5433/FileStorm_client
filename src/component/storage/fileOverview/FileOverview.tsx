import './fileOverview.sass';

import type { Chunk } from '../../../lib/definition/chunk';

import { getFormatedDate, getFormatedFileSize, getIconElement } from '../../../lib/util/file';

import FileOptionsDropdown from './fileOptionsDropdown/FileOptionsDropdown';
import SelectRing from './selectRing/SelectRing';
import EmptyDirectory from './emptyDirectory/EmptyDirectory';

export default function FileOverview({
    simpleDirectoryRefs,
    hydratedChunkRefs,
    goToNextDir
}: {
    simpleDirectoryRefs: { [key: string]: number } | null,
    hydratedChunkRefs: { [key: string]: Chunk } | null,
    goToNextDir: (nextDir: string) => void
}) {

    function fileMapper(chunk: Chunk) {
        return (
            <div className="file-row" key={chunk.id}>
                <div className="file-col selector">
                    <SelectRing entityMarker={chunk.id.toString()} />
                </div>
                <div className="file-col type">
                    {getIconElement(chunk.mime_type)}
                </div>
                <div className="file-col name">
                    <a className="text-content" href={`/api/file?fileId=${chunk.id}`} download={chunk.name}>
                        {chunk.name}
                    </a>
                    {/* TODO: dropdown functionality */}
                    <FileOptionsDropdown chunk={chunk} />
                </div>
                <div className="file-col size">
                    <p className="text-content">
                        {getFormatedFileSize(chunk.size_bytes)}
                    </p>
                </div>
                <div className="file-col created">
                    <p className="text-content">
                        {getFormatedDate(chunk.created_on)}
                    </p>
                </div>
            </div>
        );
    }

    function directoryMapper(entry: [string, number]) {
        return (
            <div className="file-row" key={entry[0]}>
                <div className="file-col selector">
                    <SelectRing entityMarker={entry[0]} />
                </div>
                <div className="file-col type">
                    {getIconElement('directory')}
                </div>
                <div className="file-col name">
                    <p className="text-content" onClick={() => goToNextDir(entry[0])}>
                        {entry[0]}
                    </p>
                    {/* TODO: dropdown functionality */}
                    {/* <FileOptionsDropdown /> */}
                </div>
                <div className="file-col size">
                    <p className="text-content">
                        {entry[1]} Elements
                    </p>
                </div>
                <div className="file-col created">
                    <p className="text-content">
                        -
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
                            Object.values(hydratedChunkRefs || {}).length == 0 && Object.entries(simpleDirectoryRefs || {}).length == 0 ? <EmptyDirectory /> :
                                <>
                                    {
                                        Object.entries(simpleDirectoryRefs || {}).map(directoryMapper)
                                    }
                                    {
                                        Object.values(hydratedChunkRefs || {}).map(fileMapper)
                                    }
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}