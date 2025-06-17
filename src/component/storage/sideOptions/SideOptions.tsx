import { NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import './sideOptions.sass';
import { useRef } from 'react';
import mouseOutClassUpdate from '../../../lib/hook/mouseOutClassUpdate';
import { setDirPath } from '../../../lib/redux/slice/directory';

export default function SideOptions({
    sideOptionsDisplay,
    sideOptionsDisplayToggler
}: {
    sideOptionsDisplay: boolean,
    sideOptionsDisplayToggler: () => void
}) {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const myStorageRef = useRef<HTMLAnchorElement>(null);
    const favoriteRef = useRef<HTMLAnchorElement>(null);
    const mySharedFilesRef = useRef<HTMLAnchorElement>(null);
    const sharedWithMeRef = useRef<HTMLAnchorElement>(null);
    
    mouseOutClassUpdate(myStorageRef.current!, 'mouseout', 0.3);
    mouseOutClassUpdate(favoriteRef.current!, 'mouseout', 0.3);
    mouseOutClassUpdate(mySharedFilesRef.current!, 'mouseout', 0.3);
    mouseOutClassUpdate(sharedWithMeRef.current!, 'mouseout', 0.3);

    return (
        <div id="side-options-main-container" className={sideOptionsDisplay ? 'show' : ''}>
            <section id="side-options-username-container">
                <h6>{user?.username || ''}</h6>
                <button className="custom-icon-btn" onClick={sideOptionsDisplayToggler}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </section>
            <div className="custom-horizontal-divider"></div>
            <section id="side-options-location-container">
                <ul>
                    <li>
                        <NavLink to="my-storage" ref={myStorageRef}>
                            <span></span>
                            <div>
                                <i className="bi bi-archive"></i>
                            </div>
                            My Storage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="favorite" ref={favoriteRef} onClick={() => dispatch(setDirPath([[user?.id || 0, 'My Storage']]))}>
                            <span></span>
                            <div>
                                <i className="bi bi-heart"></i>
                            </div>
                            Favorite
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="my-shared-files" ref={mySharedFilesRef} onClick={() => dispatch(setDirPath([[user?.id || 0, 'My Storage']]))}>
                            <span></span>
                            <div>
                                <i className="bi bi-share"></i>
                            </div>
                            My Shared Files
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="shared-with-me" ref={sharedWithMeRef} onClick={() => dispatch(setDirPath([[user?.id || 0, 'My Storage']]))}>
                            <span></span>
                            <div>
                                <i className="bi bi-people"></i>
                            </div>
                            Shared With Me
                        </NavLink>
                    </li>
                </ul>
            </section>
        </div>
    );
}

