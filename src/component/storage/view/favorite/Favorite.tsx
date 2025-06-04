import { useEffect, useState } from 'react';
import { getFavoriteRequest } from '../../../../lib/action/favoriteRequest';
import fetcher from '../../../../lib/action/fetcher';
import './favorite.sass';
import type { Chunk } from '../../../../lib/definition/chunk';
import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

export default function Favorite() {

    const [favorite, setFavorite] = useState<Chunk[]>([]);
    const [isFavoriteLoading, setFavoriteLoading] = useState(true);

    useEffect(() => {
        getFavorite();
    }, []);

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