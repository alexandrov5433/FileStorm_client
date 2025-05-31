import './storage.sass';

import SideOptions from './sideOptions/SideOptions';

import { useState } from 'react';
import NavBar from '../base/navBar/NavBar';
import { Outlet } from 'react-router';


export default function Storage() {

    const [sideOptionsDisplay, setSideOptionsDisplay] = useState(false);

    function toggleSideOptionsDisplay() {
        setSideOptionsDisplay(state => !state);
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
                                <span className="dropdown-item">
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
                        sideOptionsDisplayToggler={toggleSideOptionsDisplay} />
                </section>
                <section id="storageFileOverviewContainer" className="flex-col-strech-wrapper">
                    <Outlet />
                </section>
            </div>
        </>
    );
}