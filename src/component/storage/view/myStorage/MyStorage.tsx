import './myStorage.sass';

import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

import { useEffect, useState } from 'react';
import fetcher from '../../../../lib/action/fetcher';
import { getDirectoryRequest } from '../../../../lib/action/fileSystem/directoryRequest';
import { buildDirectoryPath } from '../../../../lib/util/directory';
import type { HydratedDirectoryReference } from '../../../../lib/definition/hydratedDirectoryReference';
import { useOutletContext } from 'react-router';
import type { Chunk } from '../../../../lib/definition/chunk';

export default function MyStorage() {
    const { dirPath, setDirPath, newlyAddedDirRef }: {
        dirPath: Array<string | number>,
        setDirPath: React.Dispatch<React.SetStateAction<(string | number)[]>>,
        newlyAddedDirRef: HydratedDirectoryReference | null
    } = useOutletContext();

    const [simpleDirectoryRefs, setSimpleDirectoryRefs] = useState<{ [key: string]: number } | null>(null);
    const [hydratedChunkRefs, setHydratedChunkRefs] = useState<{ [key: string]: Chunk } | null>(null);

    const [isDirRefLoading, setDirRefLoading] = useState(true);

    useEffect(() => {
        getDirectoryData();
    }, [dirPath]);

    useEffect(() => {
        const newDirName = newlyAddedDirRef?.name || '';
        const elementsCount = Object.values(newlyAddedDirRef?.hydratedChunkRefs || {}).length + Object.values(newlyAddedDirRef?.simpleDirectoryRefs || {}).length;
        setSimpleDirectoryRefs(state => {
            const newState = { ...state };
            Object.assign(newState, { [newDirName]: elementsCount });
            return newState;
        });
    }, [newlyAddedDirRef]);

    async function getDirectoryData() {
        setDirRefLoading(true);
        const res = await fetcher(
            getDirectoryRequest({ 'targetDirectoryPath': buildDirectoryPath(dirPath) })
        );
        if (res.status == 200) {
            setSimpleDirectoryRefs((res.payload as HydratedDirectoryReference).simpleDirectoryRefs);
            setHydratedChunkRefs((res.payload as HydratedDirectoryReference).hydratedChunkRefs);
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
                        simpleDirectoryRefs={simpleDirectoryRefs}
                        hydratedChunkRefs={hydratedChunkRefs}
                        goToNextDir={goToNextDir}
                        displayEntities='all'
                    />
            }
        </div>
    );
}

