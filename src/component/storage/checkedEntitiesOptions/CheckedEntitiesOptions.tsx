import './checkedEntitiesOptions.sass';

import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { getDeleteSelectedRequest } from '../../../lib/action/checkedEntities';
import { setMessage } from '../../../lib/redux/slice/messenger';
import { useState } from 'react';
import fetcher from '../../../lib/action/fetcher';
import { removeMultipleChunksById, removeMultipleSubdirsById } from '../../../lib/redux/slice/directory';
import { getBytesInStorageRequest } from '../../../lib/action/userDataRequest';
import { setBytesInStorage } from '../../../lib/redux/slice/user';
import type { FetcherReturn } from '../../../lib/definition/fetcherReturn';
import { chunksRemovedFromFav } from '../../../lib/redux/slice/favoriteUpdate';

export default function CheckedEntitiesOptions() {
    const dispatch = useAppDispatch();
    const { checkedTypedEntities, renderOptions } = useAppSelector(state => state.checkedEntities);

    const [downloadLoading, setDownloadLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [processLoading, setProcessLoading] = useState(false);

    async function downloadSelected() {
        if (downloadLoading || deleteLoading || processLoading) return;
        setDownloadLoading(true);
        setProcessLoading(true);
        const chunks = extractEntitiesIds('chunk');
        const directories = extractEntitiesIds('directory');
        const hrefValue = renderOptions.currentView === 'SharedWithMe'
            ? `/api/file-sharing/file/bulk?chunkIdsStr=${chunks.join('_')}`
            : `/api/file/bulk?chunkIdsStr=${chunks.join('_')}&directoryIdsStr=${directories.join('_')}`;
        const a = document.createElement('a');
        a.download = 'FileStorm.tar';
        a.href = hrefValue;
        a.click();
        setDownloadLoading(false);
        setProcessLoading(false);
    }

    async function deleteSelected() {
        if (downloadLoading || deleteLoading || processLoading) return;
        setDeleteLoading(true);
        setProcessLoading(true);
        const chunks = extractEntitiesIds('chunk');
        const directories = extractEntitiesIds('directory');
        const res = await fetcher(getDeleteSelectedRequest({
            chunks,
            directories
        }));
        if (res.status === 200) {
            getBytesInStorage();
            dispatch(removeMultipleChunksById(chunks));
            dispatch(removeMultipleSubdirsById(directories));
            dispatch(chunksRemovedFromFav(chunks));
        } else {
            dispatch(setMessage({
                title: 'Ooops...',
                text: res.msg || 'A problem occurred. Please try again.',
                type: 'negative',
                duration: 5000
            }));
        }
        setDeleteLoading(false);
        setProcessLoading(false);
    }

    async function getBytesInStorage() {
        const res = await fetcher(getBytesInStorageRequest());
        if (res.status === 200) {
            dispatch(setBytesInStorage((res as FetcherReturn).payload as number || 0));
        }
    }

    function extractEntitiesIds(entityType: 'chunk' | 'directory'): number[] {
        return checkedTypedEntities.reduce((acc, cur) => {
            if (cur.entityType === entityType) {
                acc.push(cur.entityId);
            }
            return acc;
        }, [] as number[]);
    }

    return (
        <div id="check-ent-options-main-cantainer" className="anime-fade-in">
            {
                renderOptions.download ?
                    <button disabled={downloadLoading || processLoading} onClick={downloadSelected} className="custom-btn w-fit-cont size-medium secondary-btn">
                        <i className="bi bi-download color-teal"></i>&nbsp;{
                            downloadLoading ? 'Loading...' : 'Download Selected'
                        }
                    </button>
                    : ''
            }
            {
                renderOptions.delete ?
                    <button disabled={deleteLoading || processLoading} onClick={deleteSelected} className="custom-btn w-fit-cont size-medium secondary-btn">
                        <i className="bi bi-trash3 color-red"></i>&nbsp;{
                            deleteLoading ? 'Loading...' : 'Delete Selected'
                        }
                    </button>
                    : ''
            }
        </div>
    );
}