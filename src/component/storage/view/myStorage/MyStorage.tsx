import './myStorage.sass';

import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import FileOverview from '../../fileOverview/FileOverview';

import { useEffect, useState } from 'react';
import fetcher from '../../../../lib/action/fetcher';
import { getDirectoryRequest } from '../../../../lib/action/fileSystem/directoryRequest';
import { buildDirectoryPath, compareArrays } from '../../../../lib/util/directory';
import type { HydratedDirectoryReference } from '../../../../lib/definition/hydratedDirectoryReference';
import type { Chunk } from '../../../../lib/definition/chunk';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import { setDirPath } from '../../../../lib/redux/slice/directory';

export default function MyStorage() {
    const dispatch = useAppDispatch();
    const { dirPath, newlyDeletedDir, newlyAddedDirRef, newlyDeletedFile } = useAppSelector(state => state.directory);
    
    const [simpleDirectoryRefs, setSimpleDirectoryRefs] = useState<{ [key: string]: number } | null>(null);
    const [hydratedChunkRefs, setHydratedChunkRefs] = useState<Chunk[] | null>(null);
    
    const [isDirRefLoading, setDirRefLoading] = useState(true);

    useEffect(() => {
        getDirectoryData();
    }, [dirPath]);
    
    useEffect(() => {
        const newDirName = newlyAddedDirRef?.name || '';
        const elementsCount = (hydratedChunkRefs || []).length + Object.values(newlyAddedDirRef?.simpleDirectoryRefs || {}).length;
        setSimpleDirectoryRefs(state => {
            const newState = { ...state };
            Object.assign(newState, { [newDirName]: elementsCount });
            return newState;
        });
    }, [newlyAddedDirRef]);

    useEffect(() => {
        const { dirPath: dirPathOfDeletedDir, dirName } = newlyDeletedDir;
        if (compareArrays(dirPath, dirPathOfDeletedDir)) {
            setSimpleDirectoryRefs(state => {
                return Object.entries(state! || {}).reduce((acc, cur) => {
                    if (cur[0] != dirName) {
                        (acc as any)[cur[0]] = cur[1];
                    }
                    return acc;
                }, {});
            });
        }
    }, [newlyDeletedDir]);

    useEffect(() => {
        setHydratedChunkRefs(state => {
            return (state || []).filter(c => c.id != newlyDeletedFile?.id);
        });
    }, [newlyDeletedFile]);

    async function getDirectoryData() {
        setDirRefLoading(true);
        const res = await fetcher(
            getDirectoryRequest({ 'targetDirectoryPath': buildDirectoryPath(dirPath) })
        );
        if (res.status == 200) {
            setSimpleDirectoryRefs((res.payload as HydratedDirectoryReference).simpleDirectoryRefs || {});
            setHydratedChunkRefs((res.payload as HydratedDirectoryReference).hydratedChunkRefs || []);
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

    function goToTargetDir(dirIndexInDirPath: number) {
        const targetDir = dirPath.slice(0, dirIndexInDirPath + 1);
        dispatch(setDirPath(targetDir));
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
                        simpleDirectoryRefs={simpleDirectoryRefs || {}}
                        hydratedChunkRefs={hydratedChunkRefs || []}
                        displayEntities='all'
                    />
            }
        </div>
    );
}

