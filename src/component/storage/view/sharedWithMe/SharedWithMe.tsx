import { useEffect, useState } from 'react';
import './sharedWithMe.sass';
import fetcher from '../../../../lib/action/fetcher';
import { getSharedWithMeRequest } from '../../../../lib/action/shareRequest';
import type { Chunk } from '../../../../lib/definition/chunk';
import { useAppDispatch } from '../../../../lib/redux/reduxTypedHooks';
import { setMessage } from '../../../../lib/redux/slice/messenger';
import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

export default function SharedWithMe() {
    const dispatch = useAppDispatch();

    const [sharedRequestLoading, setSharedRequestLoading] = useState(false);
    const [chunksSharedWithMe, setChunksSharedWithMe] = useState<Chunk[]>([]);

    const fileOptionsToRender = {
        favorite: false,
        download: true,
        delete: false,
        share: false
    }

    useEffect(() => {
        getSharedWithMe();
    }, []);

    async function getSharedWithMe() {
        setSharedRequestLoading(true);
        const res = await fetcher(getSharedWithMeRequest());
        if (res.status === 200) {
            setChunksSharedWithMe(res.payload as Chunk[]);
        } else {
            dispatch(setMessage({
                title: 'Ooops...',
                text: res.msg || 'A problem ocurred. Please try again.',
                type: 'negative',
                duration: 5000
            }));
        }
        setSharedRequestLoading(false);
    }
    return (
        <div id="shared-with-me-main-container" className="flex-col-strech-wrapper">
            <h4>Shared With Me</h4>
            {
                sharedRequestLoading ? <StorageViewLoader /> :
                    <FileOverview
                        displayEntities='filesOnly'
                        hydratedChunks={chunksSharedWithMe}
                        emptyDirectoryIcon='file'
                        emptyDirectoryTextContent='There are no files shared with you.'
                        fileOptionsToRender={fileOptionsToRender}
                        parrentComponent='SharedWithMe'
                    />
            }
        </div>
    );
}