import './optionsDropdown.sass';

import type { Chunk } from '../../../../lib/definition/chunk';
import fetcher from '../../../../lib/action/fetcher';
import { markFileAsFavorite, removeFileFromFavorite } from '../../../../lib/action/favoriteRequest';
import { useState } from 'react';
import { useAppDispatch } from '../../../../lib/redux/reduxTypedHooks';
import { chunkAddedToFav, chunkRemovedFromFav } from '../../../../lib/redux/slice/favoriteUpdate';
import { deleteFileRequest } from '../../../../lib/action/fileSystem/fileRequest';
import { setNewlyDeletedFileId } from '../../../../lib/redux/slice/directory';
import tooltipInitializer from '../../../../lib/hook/tooltipInitializer';

export default function FileOptionsDropdown({
    chunk
}: {
    chunk: Chunk
}) {
    const dispatch = useAppDispatch();

    const [isFavorite, setIsFavorite] = useState(chunk.isFavorite);
    const [isFavoriteRequestLoading, setFavoriteRequestLoading] = useState(false);
    const [isDeleteFileInProgress, setDeleteFileInProgress] = useState(false);

    tooltipInitializer('[data-bs-toggle-tooltip="tooltip"]');

    function download() {
        const anchor = document.createElement('a');
        anchor.href = `/api/file/${chunk.id}`;
        anchor.download = chunk.originalFileName;
        anchor.click();
    }

    async function deleteFile() {
        setDeleteFileInProgress(true);
        const res = await fetcher(deleteFileRequest(chunk.id));
        if (res.status == 200) {
            dispatch(setNewlyDeletedFileId(res.payload as number));
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

    return (
        <div id="options-dropdown-main-container">
            <div id="file-options-favorite-container" className="custom-icon-btn" onClick={
                isFavoriteRequestLoading ? () => null :
                    (isFavorite ? removeFromFavorite : addToFavorite)
            }>
                {
                    isFavorite ? <i className="bi bi-star-fill is_favorite"></i> :
                        <i className="bi bi-star"></i>
                }
            </div>
          
            <div className="dropdown custom-icon-btn" data-bs-toggle="dropdown"
            data-bs-toggle-tooltip="tooltip"
            data-bs-title="File Options"
            data-bs-trigger="hover focus"
            data-bs-custom-class="custom-tooltip"
            >
                <i className="bi bi-three-dots-vertical"></i>
                <ul className="dropdown-menu custom-dropdown">
                    <li>
                        <span className="dropdown-item" onClick={download}>
                            <i className="bi bi-download"></i>
                            Download
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item red-item" onClick={
                            isDeleteFileInProgress ? () => null : deleteFile
                        }>
                            <i className="bi bi-trash3"></i>
                            Delete
                        </span>
                    </li>
                </ul>
            </div>
           
        </div>
    );
}

