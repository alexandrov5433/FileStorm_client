import './storage.sass';

import SideOptions from './sideOptions/SideOptions';

import { useState } from 'react';
import NavBar from '../base/navBar/NavBar';


export default function Storage() {

    const [sideOptionsDisplay, setSideOptionsDisplay] = useState(false);

    function toggleSideOptionsDisplay() {
        setSideOptionsDisplay(state => !state);
    }

    return (
        <>
            <NavBar />
            <div className="wrapper">
                <section id="storageSideOptionsContainer">
                    <button id="storageAddNewBtn" className="btn" type="button">
                        <i className="bi bi-plus-lg"></i>
                        Add New
                    </button>
                    <button id="storageSideOptionsBtn" onClick={toggleSideOptionsDisplay} className="custom-btn secondary-btn" type="button">More</button>
                    <SideOptions
                        sideOptionsDisplay={sideOptionsDisplay}
                        sideOptionsDisplayToggler={toggleSideOptionsDisplay} />
                </section>
                <section id="storageFileOverviewContainer">
                    storageFileOverview Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic aperiam magni natus delectus earum enim quis nemo repellendus dolore placeat eveniet omnis, beatae soluta temporibus ea eos at. Recusandae, magnam aliquam ab facere explicabo quo, enim eaque quas eligendi accusamus voluptatum totam assumenda ut in! Sint, quos laborum? Doloribus quas accusamus eum aspernatur non voluptates fuga ipsam dolorem, et eveniet error laboriosam recusandae in cumque provident soluta iusto! Commodi recusandae perspiciatis blanditiis laboriosam consequatur voluptate, quis, dicta culpa reiciendis quo perferendis deserunt, suscipit eius voluptatem possimus mollitia repellat dolor eum error quibusdam. Culpa, quam ut fugiat ipsa voluptatem esse ullam?
                </section>
            </div>
        </>
    );
}