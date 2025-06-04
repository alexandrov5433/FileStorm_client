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

    useEffect(() => {
        getFavorite();
    }, []);

    useEffect(() => {
        if (favoriteUpdate.updateType == 'remove') {
            const removedChunkId = favoriteUpdate.chunk?.id || 0;
            setFavorite(state => state.filter(c => c.id != removedChunkId));
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
            <section id="favorite-top-bar">
                <h3>Favorite</h3>
            </section>
            {
                isFavoriteLoading ? <StorageViewLoader /> :
                    <FileOverview
                        displayEntities='filesOnly'
                        hydratedChunkRefs={favorite}
                        emptyDirectoryTextContent='No Favorites.'
                        emptyDirectoryIcon='file'
                    />
            }
        </div>
    );
}