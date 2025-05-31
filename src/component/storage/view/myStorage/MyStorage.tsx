import './myStorage.sass';

import StorageViewLoader from '../../../skeleton/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import fetcher from '../../../../lib/action/fetcher';
import directoryRequest from '../../../../lib/action/fileSystem/directoryRequest';
import { buildDirectoryPath } from '../../../../lib/util/directory';
import type { HydratedDirectoryReference } from '../../../../lib/definition/hydratedDirectoryReference';

export default function MyStorage() {
    const user = useAppSelector(state => state.user);

    const [dirPath, setDirPath] = useState<Array<string | number>>([user.id]);
    const [hydratedDirRef, setHydratedDirRef] = useState<HydratedDirectoryReference | null>(null);
    const [isDirRefLoading, setDirRefLoading] = useState(true);

    useEffect(() => {
        if (user.id <= 0) return;
        setDirPath([user.id]);
        getDirectoryData()
    }, [user.id]);

    async function getDirectoryData() {
        setDirRefLoading(true);
        const res = await fetcher(
            directoryRequest('/api/directory', 'GET', { 'targetDirectoryPath': buildDirectoryPath(dirPath) })
        );
        if (res.status == 200) {
            setHydratedDirRef(res.payload);
        } else if (res.status == 400) {

        }
        setDirRefLoading(false);
    }

    function breadcrumbMapper(part: string | number, index: number) {
        return (
            <li key={part + index.toString()} className={`breadcrumb-item${dirPath.length - 1 == index ? ' active' : ''}`} aria-current="page">
                {index == 0 ? 'My Storage' : part}
            </li>
        );
    }

    // add "active" class to active crumb
    return (
        <div id="my-storage-main-container" className="flex-col-strech-wrapper">
            <section id="my-storage-breadcrumb-container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {dirPath.map(breadcrumbMapper)}
                    </ol>
                </nav>
            </section>
            {
                isDirRefLoading ? <StorageViewLoader /> :
                    <FileOverview hydratedDirectoryReference={hydratedDirRef} />
            }
        </div>
    );
}

