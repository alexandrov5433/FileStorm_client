import './optionsDropdown.sass';

import { useAppDispatch } from '../../../../lib/redux/reduxTypedHooks';
import { useState } from 'react';
import { deleteDirectory } from '../../../../lib/action/fileSystem/directoryRequest';
import { removeSubdirById } from '../../../../lib/redux/slice/directory';
import fetcher from '../../../../lib/action/fetcher';
import tooltipInitializer from '../../../../lib/hook/tooltipInitializer';
import type { User } from '../../../../lib/definition/user';
import { setUser } from '../../../../lib/redux/slice/user';
import type { Directory } from '../../../../lib/definition/directory';
import { openTextInputBox } from '../../../../lib/redux/slice/textInputBox';

export default function DirectoryOptionsDropdown({
    directory
}: {
    directory: Directory
}) {
    const dispatch = useAppDispatch();

    const [isDeletionInProgress, setDeletionInProgress] = useState(false);

    async function deleteDir() {
        setDeletionInProgress(true);
        const res = await fetcher(deleteDirectory(directory?.id || 0));
        if (res.status == 200) {
            dispatch(removeSubdirById(directory?.id || 0));
            dispatch(setUser(res.payload as User));
        }
        setDeletionInProgress(false);
    }

    function rename() {
        dispatch(openTextInputBox({
            funcToRunOnInputDone: 'renameDirectory',
            funcInputValueValidator: 'validateFileAndDirName',
            btnText: 'Rename',
            textContent: 'New Directory Name',
            textExtraNote: 'Can not contain: < > : " / \\ | ? *',
            entityToRename: directory
        }));
    }

    tooltipInitializer('[data-bs-toggle-tooltip="tooltip"]');

    return (
        <div id="options-dropdown-main-container">

            <button className="dropdown custom-icon-btn" data-bs-toggle="dropdown"
                data-bs-toggle-tooltip="tooltip"
                data-bs-title="Directory Options"
                data-bs-trigger="hover focus"
                data-bs-custom-class="custom-tooltip"
            >
                <i className="bi bi-three-dots-vertical"></i>
                <ul className="dropdown-menu custom-dropdown">
                    <li>
                        <span className="dropdown-item red-item" onClick={
                            isDeletionInProgress ? () => null : deleteDir
                        }>
                            <i className="bi bi-trash3"></i>
                            Delete
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item" onClick={rename}>
                            <i className="bi bi-input-cursor"></i>
                            Rename
                        </span>
                    </li>
                </ul>
            </button>

        </div>
    );
}