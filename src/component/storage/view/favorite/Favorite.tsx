import './favorite.sass';

import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

import { useEffect, useState } from 'react';
import { getFavoriteRequest } from '../../../../lib/action/favoriteRequest';
import fetcher from '../../../../lib/action/fetcher';
import type { Chunk } from '../../../../lib/definition/chunk';
import { useAppSelector } from '../../../../lib/redux/reduxTypedHooks';

export default function Favorite() {
    const favoriteUpdate = useAppSelector(state => state.favoriteUpdate);

    const [favorite, setFavorite] = useState<Chunk[]>([]);
    const [isFavoriteLoading, setFavoriteLoading] = useState(true);

    const fileOptionsToRender = {
        favorite: true,
        download: true,
        delete: true,
        share: true,
        rename: true
    }

    useEffect(() => {
        getFavorite();
    }, []);

    useEffect(() => {
        if (favoriteUpdate.updateType == 'remove') {
            const removedChunks = favoriteUpdate.chunks || [];
            setFavorite(state => {
                return state.reduce((acc, cur) => {
                    const currentChunkId = cur.id;
                    const indexInRemoved = removedChunks.findIndex(cId => cId === currentChunkId);
                    if (indexInRemoved == -1) {
                        acc.push(cur);
                    }
                    return acc;
                }, [] as Chunk[]);
            });
        }
    }, [favoriteUpdate]);

    async function getFavorite() {
        setFavoriteLoading(true);
        const res = await fetcher(getFavoriteRequest());
        if (res.status == 200) {
            setFavorite(res.payload as Chunk[]);
        }
        setFavoriteLoading(false);
    }

    return (
        <div id="favorite-main-container" className="flex-col-strech-wrapper">
            <h4>Favorite</h4>
            {
                isFavoriteLoading ? <StorageViewLoader /> :
                    <FileOverview
                        displayEntities='filesOnly'
                        hydratedChunks={favorite}
                        emptyDirectoryTextContent='No Favorites.'
                        emptyDirectoryIcon='file'
                        fileOptionsToRender={fileOptionsToRender}
                    />
            }
        </div>
    );
}