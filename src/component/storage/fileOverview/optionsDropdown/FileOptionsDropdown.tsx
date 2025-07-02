import './optionsDropdown.sass';

import type { Chunk } from '../../../../lib/definition/chunk';
import fetcher from '../../../../lib/action/fetcher';
import { markFileAsFavorite, removeFileFromFavorite } from '../../../../lib/action/favoriteRequest';
import { useState } from 'react';
import { useAppDispatch } from '../../../../lib/redux/reduxTypedHooks';
import { chunkAddedToFav, chunkRemovedFromFav } from '../../../../lib/redux/slice/favoriteUpdate';
import { deleteFileRequest } from '../../../../lib/action/fileSystem/fileRequest';
import { removeChunkById } from '../../../../lib/redux/slice/directory';
import tooltipInitializer from '../../../../lib/hook/tooltipInitializer';
import { initShareInterfaceWithEntity } from '../../../../lib/redux/slice/shareInterface';
import type { FileOptionsDropdownOptionsToRender } from '../../../../lib/definition/fileOptionsDropdownTypes';
import { removeBytesInStorage } from '../../../../lib/redux/slice/user';

export default function FileOptionsDropdown({
    chunk,
    fileOptionsToRender,
    downloadFileSharedWithMe
}: {
    chunk: Chunk,
    fileOptionsToRender: FileOptionsDropdownOptionsToRender,
    downloadFileSharedWithMe?: boolean
}) {
    const dispatch = useAppDispatch();

    const [isFavorite, setIsFavorite] = useState(chunk.isFavorite);
    const [isFavoriteRequestLoading, setFavoriteRequestLoading] = useState(false);
    const [isDeleteFileInProgress, setDeleteFileInProgress] = useState(false);

    tooltipInitializer('[data-bs-toggle-tooltip="tooltip"]');

    function download() {
        const anchor = document.createElement('a');
        anchor.href = downloadFileSharedWithMe ? `/api/file-sharing/file?fileId=${chunk.id}` : `/api/file/${chunk.id}`;
        anchor.download = chunk.originalFileName;
        anchor.click();
    }

    async function deleteFile() {
        setDeleteFileInProgress(true);
        const res = await fetcher(deleteFileRequest(chunk.id));
        if (res.status == 200) {
            dispatch(removeChunkById(res.payload as number));
            dispatch(removeBytesInStorage(chunk.sizeBytes));
        }
        setDeleteFileInProgress(false);
    }

    async function addToFavorite() {
        setFavoriteRequestLoading(true);
        const res = await fetcher(markFileAsFavorite(chunk.id));
        if (res.status === 200) {
            setIsFavorite(true);
            dispatch(chunkAddedToFav(chunk));
        }
        setFavoriteRequestLoading(false);
    }

    async function removeFromFavorite() {
        setFavoriteRequestLoading(true);
        const res = await fetcher(removeFileFromFavorite(chunk.id));
        if (res.status === 200) {
            setIsFavorite(false)
            dispatch(chunkRemovedFromFav(res.payload as Chunk));
        }
        setFavoriteRequestLoading(false);
    }

    function openShareInterface() {
        dispatch(initShareInterfaceWithEntity(chunk));
    }

    return (
        <div id="options-dropdown-main-container">
            {
                fileOptionsToRender.favorite ?
                    <div id="file-options-favorite-container" className="custom-icon-btn" onClick={
                        isFavoriteRequestLoading ? () => null :
                            (isFavorite ? removeFromFavorite : addToFavorite)
                    }
                        data-bs-toggle-tooltip="tooltip"
                        data-bs-title={
                            isFavorite ? 'Remove from Favorite' : 'Add to Favorite'
                        }
                        data-bs-trigger="hover focus"
                        data-bs-custom-class="custom-tooltip">
                        {
                            isFavorite ? <i className="bi bi-star-fill is_favorite"></i> :
                                <i className="bi bi-star"></i>
                        }
                    </div>
                    : ''
            }

            <div className="dropdown custom-icon-btn" data-bs-toggle="dropdown"
                data-bs-toggle-tooltip="tooltip"
                data-bs-title="File Options"
                data-bs-trigger="hover focus"
                data-bs-custom-class="custom-tooltip"
            >
                <i className="bi bi-three-dots-vertical"></i>
                <ul className="dropdown-menu custom-dropdown">
                    {
                        fileOptionsToRender.download ?
                            <li>
                                <span className="dropdown-item" onClick={download}>
                                    <i className="bi bi-download"></i>
                                    Download
                                </span>
                            </li>
                            : ''
                    }
                    {
                        fileOptionsToRender.delete ?
                            <li>
                                <span className="dropdown-item red-item" onClick={
                                    isDeleteFileInProgress ? () => null : deleteFile
                                }>
                                    <i className="bi bi-trash3"></i>
                                    Delete
                                </span>
                            </li>
                            : ''
                    }
                    {
                        fileOptionsToRender.share ?
                            <li>
                                <span className="dropdown-item" onClick={openShareInterface}>
                                    <i className="bi bi-share"></i>
                                    Share
                                </span>
                            </li>
                            : ''
                    }
                </ul>
            </div>

        </div>
    );
}

