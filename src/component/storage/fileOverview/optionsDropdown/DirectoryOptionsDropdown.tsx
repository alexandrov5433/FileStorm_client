import './optionsDropdown.sass';

import { useAppDispatch, useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import { useState } from 'react';
import { deleteDirectory } from '../../../../lib/action/fileSystem/directoryRequest';
import { setNewlyDeleteDir } from '../../../../lib/redux/slice/directory';

export default function DirectoryOptionsDropdown({
    dirName
} : {
    dirName: string
}) {
    const dispatch = useAppDispatch();
    const { dirPath } = useAppSelector(state => state.directory);

    const [isDeletionInProgress, setDeletionInProgress] = useState(false);

    async function deleteDir() {
        setDeletionInProgress(true);
        const curDirPath = [...dirPath];
        const res = await fetch(deleteDirectory(curDirPath, dirName));
        if (res.status == 200) {
            dispatch(setNewlyDeleteDir({dirPath: curDirPath, dirName}));
        }
        setDeletionInProgress(false);
    }
    
    return (
        <div id="options-dropdown-main-container">
            <div className="dropdown custom-icon-btn" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots-vertical"></i>
                <ul className="dropdown-menu custom-dropdown">
                    <li>
                        <span className="dropdown-item">
                            <i className="bi bi-download"></i>
                            Download
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item red-item" onClick={
                            isDeletionInProgress ? () => null : deleteDir
                        }>
                            <i className="bi bi-trash3"></i>
                            Delete
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}