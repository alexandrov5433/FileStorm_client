import './optionsDropdown.sass';

import { useAppDispatch } from '../../../../lib/redux/reduxTypedHooks';
import { useState } from 'react';
import { deleteDirectory } from '../../../../lib/action/fileSystem/directoryRequest';
import { setNewlyDeleteDirId } from '../../../../lib/redux/slice/directory';
import fetcher from '../../../../lib/action/fetcher';

export default function DirectoryOptionsDropdown({
    directoryId
} : {
    directoryId: number
}) {
    const dispatch = useAppDispatch();

    const [isDeletionInProgress, setDeletionInProgress] = useState(false);

    async function deleteDir() {
        setDeletionInProgress(true);
        const res = await fetcher(deleteDirectory(directoryId));
        if (res.status == 200) {
            dispatch(setNewlyDeleteDirId(res.payload as number));
        }
        setDeletionInProgress(false);
    }
    
    return (
        <div id="options-dropdown-main-container">
            <div className="dropdown custom-icon-btn" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots-vertical"></i>
                <ul className="dropdown-menu custom-dropdown">
                    {/* <li>
                        <span className="dropdown-item">
                            <i className="bi bi-download"></i>
                            Download
                        </span>
                    </li> */}
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