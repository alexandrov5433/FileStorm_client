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

                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <button id="storageSideOptionsBtn" onClick={toggleSideOptionsDisplay} className="custom-btn secondary-btn" type="button">More</button>
                    <SideOptions
                        sideOptionsDisplay={sideOptionsDisplay}
                        sideOptionsDisplayToggler={toggleSideOptionsDisplay} />
                </section>
                <section id="storageFileOverviewContainer">
                    <Outlet/>
                </section>
            </div>
        </>
    );
}