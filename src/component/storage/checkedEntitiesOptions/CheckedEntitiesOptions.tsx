import './checkedEntitiesOptions.sass';

import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { getDeleteSelectedRequest, getDownloadSelectedRequest, getDownloadSharedSelectedRequest } from '../../../lib/action/checkedEntities';
import { setMessage } from '../../../lib/redux/slice/messenger';
import { useState } from 'react';
import type { ApiResponse } from '../../../lib/definition/apiResponse';
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

    async function downloadSelected() {
        setDownloadLoading(true);
        const chunks = extractEntitiesIds('chunk');
        const directories = extractEntitiesIds('directory');

        const request = renderOptions.currentView === 'SharedWithMe' ?
            getDownloadSharedSelectedRequest({
                chunks,
                directories
            })
            : getDownloadSelectedRequest({
                chunks,
                directories
            });

        fetch(request)
            .then(res => {
                if (!res.ok) {
                    res.json().then((apiRes: ApiResponse) => {
                        throw new Error(apiRes?.message || 'A problem occurred. Please try again.');
                    });
                }
                return res.blob();
            })
            .then(blob => {
                const a = document.createElement('a');
                a.download = 'FileStorm.zip';
                a.href = URL.createObjectURL(blob);
                a.click();
            })
            .catch(e => {
                dispatch(setMessage({
                    title: 'Ooops...',
                    text: e.msg || 'A problem occurred. Please try again.',
                    type: 'negative',
                    duration: 5000
                }));
            })
            .finally(() => {
                setDownloadLoading(false);
            });
    }

    async function deleteSelected() {
        setDeleteLoading(true);
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
                    <button disabled={downloadLoading} onClick={downloadSelected} className="custom-btn w-fit-cont size-medium secondary-btn">
                        <i className="bi bi-download color-teal"></i>&nbsp;{
                            downloadLoading ? 'Loading...' : 'Download Selected'
                        }
                    </button>
                    : ''
            }
            {
                renderOptions.delete ?
                    <button disabled={deleteLoading} onClick={deleteSelected} className="custom-btn w-fit-cont size-medium secondary-btn">
                        <i className="bi bi-trash3 color-red"></i>&nbsp;{
                            deleteLoading ? 'Loading...' : 'Delete Selected'
                        }
                    </button>
                    : ''
            }
        </div>
    );
}