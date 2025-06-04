import './fileOptionsDropdown.sass';

import type { Chunk } from '../../../../lib/definition/chunk';
import fetcher from '../../../../lib/action/fetcher';
import { markFileAsFavorite, removeFileFromFavorite } from '../../../../lib/action/favoriteRequest';
import { useState } from 'react';

export default function FileOptionsDropdown({
    chunk
}: {
    chunk: Chunk
}) {
    const [isFavorite, setIsFavorite] = useState(chunk.is_favorite);

    function download() {
        const anchor = document.createElement('a');
        anchor.href = `/api/file?fileId=${chunk.id}`;
        anchor.download = chunk.name;
        anchor.click();
    }

    async function addToFavorite() {
        const res = await fetcher(markFileAsFavorite(chunk.id));
        if (res.status === 200) {
            setIsFavorite(true);
        }
    }

    async function removeFromFavorite() {
        const res = await fetcher(removeFileFromFavorite(chunk.id));
        if (res.status === 200) {
            setIsFavorite(false)
        }
    }



    return (
        <div id="file-options-main-container">
            <div id="file-options-favorite-container" className="custom-icon-btn" onClick={
                isFavorite ? removeFromFavorite : addToFavorite
            }>
                {
                    isFavorite ? <i className="bi bi-star-fill is_favorite"></i> :
                        <i className="bi bi-star"></i>
                }
            </div>
            <div className="dropdown custom-icon-btn" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots-vertical"></i>
                <ul className="dropdown-menu custom-dropdown">
                    <li>
                        <span className="dropdown-item" onClick={download}>
                            <i className="bi bi-download"></i>
                            Download
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item red-item">
                            <i className="bi bi-trash3"></i>
                            Delete
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

