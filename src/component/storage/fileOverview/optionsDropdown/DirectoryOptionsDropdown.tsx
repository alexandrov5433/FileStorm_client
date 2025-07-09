import './optionsDropdown.sass';

import { useAppDispatch, useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import { useEffect, useRef, useState } from 'react';
import { deleteDirectory } from '../../../../lib/action/fileSystem/directoryRequest';
import { removeSubdirById } from '../../../../lib/redux/slice/directory';
import fetcher from '../../../../lib/action/fetcher';
import type { User } from '../../../../lib/definition/user';
import { setUser } from '../../../../lib/redux/slice/user';
import type { Directory } from '../../../../lib/definition/directory';
import { openTextInputBox } from '../../../../lib/redux/slice/textInputBox';
import { hideAndBlurDropdown, verticalDropdownPositionAdjuster } from '../../../../lib/util/dropdown';

export default function DirectoryOptionsDropdown({
    directory
}: {
    directory: Directory
}) {
    const dispatch = useAppDispatch();
    const { fileOverviewScrollIndicator } = useAppSelector(state => state.dropdownOptions);

    const [isDeletionInProgress, setDeletionInProgress] = useState(false);

    const ulDropdownRef = useRef<HTMLUListElement | null>(null);
    const optionsDropdownMainButtonRef = useRef<HTMLButtonElement | null>(null);

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


    // hide dropdown on FileOverview scroll
    useEffect(() => {
        hideAndBlurDropdown(ulDropdownRef.current, optionsDropdownMainButtonRef.current);
    }, [fileOverviewScrollIndicator]);

    return (
        <div id="options-dropdown-main-container">

            <button
                ref={optionsDropdownMainButtonRef}
                className="dropdown custom-icon-btn"
                data-bs-toggle="dropdown"
                title="Directory Options"
                onClick={() => verticalDropdownPositionAdjuster(ulDropdownRef.current!)}
            >
                <i className="bi bi-three-dots-vertical"></i>
                <ul ref={ulDropdownRef} className="dropdown-menu custom-dropdown">
                    <li title="Delete This Directory">
                        <span
                            className="dropdown-item red-item"
                            onClick={
                                isDeletionInProgress ? () => null : deleteDir
                            }>
                            <i className="bi bi-trash3"></i>
                            Delete
                        </span>
                    </li>
                    <li title="Rename This Directory">
                        <span
                            className="dropdown-item"
                            onClick={rename}>
                            <i className="bi bi-input-cursor"></i>
                            Rename
                        </span>
                    </li>
                </ul>
            </button>

        </div>
    );
}