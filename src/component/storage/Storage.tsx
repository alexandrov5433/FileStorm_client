import './storage.sass';

import SideOptions from './sideOptions/SideOptions';

import { useState } from 'react';
import NavBar from '../base/navBar/NavBar';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../lib/redux/reduxTypedHooks';
import TextInputBox from '../global/textInputBox/TextInputBox';
import { validateFileAndDirName } from '../../lib/util/validator';
import fetcher from '../../lib/action/fetcher';
import { createDirectoryRequest } from '../../lib/action/fileSystem/directoryRequest';
import { buildDirectoryPath } from '../../lib/util/directory';
import type { HydratedDirectoryReference } from '../../lib/definition/hydratedDirectoryReference';


export default function Storage() {
    const user = useAppSelector(state => state.user);

    const [dirPath, setDirPath] = useState<Array<string | number>>([user.id]);
    const [sideOptionsDisplay, setSideOptionsDisplay] = useState(false);
    const [isDirectoryDialog, setDirectoryDialog] = useState(false);
    const [newlyAddedDirRef, setNewlyAddedDirRef] = useState<HydratedDirectoryReference | null>(null);

    function toggleSideOptionsDisplay() {
        setSideOptionsDisplay(state => !state);
    }

    // new directory addition
    function openAddDirectoryDialog() {
        setDirectoryDialog(true);
    }
    function closeAddDirectoryDialog() {
        setDirectoryDialog(false);
    }
    async function addNewDirectory(newDirName: string) {
        const res = await fetcher(
            createDirectoryRequest(
                buildDirectoryPath(dirPath),
                newDirName
            )
        );
        if (res.status == 200) {
            // trigger refresh in my-storage
            setNewlyAddedDirRef(res.payload as HydratedDirectoryReference);
        }
    }

    // dirPath management
    function goingToOtherThanMyStorage() {
        setDirPath([user.id]);
    }

    return (
        <>
            <NavBar />
            <div className="wrapper anime-fade-in">
                <section id="storageSideOptionsContainer">
                    <div className="dropdown">
                        <button id="storageAddNewBtn" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-plus-lg"></i>
                            Add New
                        </button>

                        <ul className="dropdown-menu custom-dropdown">
                            <li>
                                <span className="dropdown-item" onClick={openAddDirectoryDialog}>
                                    <i className="bi bi-folder2"></i>
                                    Directory
                                </span>
                            </li>
                            <div className="custom-horizontal-divider"></div>
                            <li>
                                <span className="dropdown-item">
                                    <i className="bi bi-file-earmark-arrow-up"></i>
                                    Upload File
                                </span>
                            </li>
                        </ul>
                    </div>
                    <button id="storageSideOptionsBtn" onClick={toggleSideOptionsDisplay} className="custom-btn secondary-btn" type="button">More</button>
                    <SideOptions
                        sideOptionsDisplay={sideOptionsDisplay}
                        sideOptionsDisplayToggler={toggleSideOptionsDisplay}
                        goingToOtherThanMyStorage={goingToOtherThanMyStorage} />
                </section>
                <section id="storageFileOverviewContainer" className="flex-col-strech-wrapper">
                    <Outlet context={{ user, dirPath, setDirPath, newlyAddedDirRef }} />
                </section>
                {
                    isDirectoryDialog ? <TextInputBox
                        funcToRunOnInputDone={addNewDirectory}
                        funcToClose={closeAddDirectoryDialog}
                        funcInputValueValidator={validateFileAndDirName}
                        textContent='New Directory Name'
                        textExtraNote='Can not contain: < > : " / \ | ? *'
                        btnText='Add Directory'/> : ''
                }
            </div>
        </>
    );
}