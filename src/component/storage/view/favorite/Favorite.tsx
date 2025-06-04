import { useState } from 'react';
import { getFavoriteRequest } from '../../../../lib/action/favoriteRequest';
import fetcher from '../../../../lib/action/fetcher';
import './favorite.sass';
import type { Chunk } from '../../../../lib/definition/chunk';
import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

export default function Favorite() {

    const [favorite, setFavorite] = useState<Chunk[]>([]);
    const [isFavoriteLoading, setFavoriteLoading] = useState(true);

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
            <h1>Favorite</h1>
            {
                isFavoriteLoading ? <StorageViewLoader/> :
                <FileOverview/>
            }
        </div>
    );
}