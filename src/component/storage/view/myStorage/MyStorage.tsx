import './myStorage.sass';

import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

import { useEffect, useState } from 'react';
import fetcher from '../../../../lib/action/fetcher';
import { getDirectoryRequest } from '../../../../lib/action/fileSystem/directoryRequest';
import { buildDirectoryPath } from '../../../../lib/util/directory';
import type { HydratedDirectoryReference } from '../../../../lib/definition/hydratedDirectoryReference';
import { useOutletContext } from 'react-router';

export default function MyStorage() {
    const { dirPath, setDirPath }: {
        dirPath: Array<string | number>
        setDirPath: React.Dispatch<React.SetStateAction<(string | number)[]>>
    } = useOutletContext();


    const [hydratedDirRef, setHydratedDirRef] = useState<HydratedDirectoryReference | null>(null);
    const [isDirRefLoading, setDirRefLoading] = useState(true);

    useEffect(() => {
        getDirectoryData();
    }, [dirPath]);

    async function getDirectoryData() {
        setDirRefLoading(true);
        const res = await fetcher(
            getDirectoryRequest({ 'targetDirectoryPath': buildDirectoryPath(dirPath) })
        );
        if (res.status == 200) {
            setHydratedDirRef(res.payload);
        } else if (res.status == 400) {

        }
        setDirRefLoading(false);
    }

    function breadcrumbMapper(part: string | number, index: number) {
        return (
            <li key={part + index.toString()} className={`breadcrumb-item${dirPath.length - 1 == index ? ' active' : ''}`} aria-current="page" onClick={() => { goToTargetDir(index) }}>
                {index == 0 ? 'My Storage' : part}
            </li>
        );
    }

    function goToNextDir(nextDir: string) {
        setDirPath(state => {
            const newState = [...state];
            newState.push(nextDir);
            return newState;
        });
    }

    function goToTargetDir(dirIndexInDirPath: number) {
        setDirPath(state => {
            return [...state].slice(0, dirIndexInDirPath + 1);
        });
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
                    <FileOverview
                        hydratedDirectoryReference={hydratedDirRef}
                        goToNextDir={goToNextDir}
                    />
            }
        </div>
    );
}

