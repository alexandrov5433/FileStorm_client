import './optionsDropdown.sass';

import type { Chunk } from '../../../../lib/definition/chunk';
import fetcher from '../../../../lib/action/fetcher';
import { markFileAsFavorite, removeFileFromFavorite } from '../../../../lib/action/favoriteRequest';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import { chunkAddedToFav, chunkRemovedFromFav } from '../../../../lib/redux/slice/favoriteUpdate';
import { deleteFileRequest } from '../../../../lib/action/fileSystem/fileRequest';
import { removeChunkById } from '../../../../lib/redux/slice/directory';
import { initShareInterfaceWithEntity } from '../../../../lib/redux/slice/shareInterface';
import type { FileOptionsDropdownOptionsToRender } from '../../../../lib/definition/fileOptionsDropdownTypes';
import { removeBytesInStorage } from '../../../../lib/redux/slice/user';
import { openTextInputBox } from '../../../../lib/redux/slice/textInputBox';
import { hideAndBlurDropdown, verticalDropdownPositionAdjuster } from '../../../../lib/util/dropdown';

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
    const { fileOverviewScrollIndicator } = useAppSelector(state => state.dropdownOptions);

    const [isFavorite, setIsFavorite] = useState(chunk.isFavorite);
    const [isFavoriteRequestLoading, setFavoriteRequestLoading] = useState(false);
    const [isDeleteFileInProgress, setDeleteFileInProgress] = useState(false);

    const ulDropdownRef = useRef<HTMLUListElement | null>(null);
    const optionsDropdownMainButtonRef = useRef<HTMLButtonElement | null>(null);

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

    function rename() {
        dispatch(openTextInputBox({
            funcToRunOnInputDone: 'renameFile',
            funcInputValueValidator: 'validateFileAndDirName',
            btnText: 'Rename',
            textContent: 'New File Name',
            textExtraNote: 'Can not contain: < > : " / \\ | ? *',
            entityToRename: chunk
        }));
    }

    // hide dropdown on FileOverview scroll
    useEffect(() => {
        hideAndBlurDropdown(ulDropdownRef.current, optionsDropdownMainButtonRef.current);
    }, [fileOverviewScrollIndicator]);

    return (
        <div id="options-dropdown-main-container">
            {
                fileOptionsToRender.favorite ?
                    <button
                        id="file-options-favorite-container"
                        className="custom-icon-btn"
                        onClick={
                            isFavoriteRequestLoading ? () => null :
                                (isFavorite ? removeFromFavorite : addToFavorite)
                        }
                        title={
                            isFavorite ? 'Remove From Favorite' : 'Add To Favorite'
                        }>
                        {
                            isFavorite ? <i className="bi bi-star-fill is_favorite"></i> :
                                <i className="bi bi-star"></i>
                        }
                    </button>
                    : ''
            }

            <button
                ref={optionsDropdownMainButtonRef}
                className="dropdown custom-icon-btn"
                data-bs-toggle="dropdown"
                title="File Options"
                onClick={() => verticalDropdownPositionAdjuster(ulDropdownRef.current!)}
            >
                <i className="bi bi-three-dots-vertical"></i>
                <ul ref={ulDropdownRef} className="dropdown-menu custom-dropdown">
                    {
                        fileOptionsToRender.download ?
                            <li title="Download This File">
                                <span className="dropdown-item" onClick={download}>
                                    <i className="bi bi-download"></i>
                                    Download
                                </span>
                            </li>
                            : ''
                    }
                    {
                        fileOptionsToRender.delete ?
                            <li title="Delete This File">
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
                            <li title="Share This File">
                                <span className="dropdown-item" onClick={openShareInterface}>
                                    <i className="bi bi-share"></i>
                                    Share
                                </span>
                            </li>
                            : ''
                    }
                    {
                        fileOptionsToRender.rename ?
                            <li title="Rename This File">
                                <span className="dropdown-item" onClick={rename}>
                                    <i className="bi bi-input-cursor"></i>
                                    Rename
                                </span>
                            </li>
                            : ''
                    }
                </ul>
            </button>

        </div>
    );
}

