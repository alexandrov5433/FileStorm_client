import { NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import './sideOptions.sass';
import { useEffect, useRef, useState } from 'react';
import useMouseOutClassUpdate from '../../../lib/hook/mouseOutClassUpdate';
import { setDirPath } from '../../../lib/redux/slice/directory';
import { clearCheckedList } from '../../../lib/redux/slice/checkedEntities';
import { bytesToGigabytes } from '../../../lib/util/convert';

export default function SideOptions({
    sideOptionsDisplay,
    sideOptionsDisplayToggler
}: {
    sideOptionsDisplay: boolean,
    sideOptionsDisplayToggler: () => void
}) {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [valBytesInStorage, setValBytesInStorage] = useState('0');
    const [valMaxStorageSpace, setValMaxStorageSpace] = useState('0');

    const myStorageRef = useRef<HTMLAnchorElement>(null);
    const favoriteRef = useRef<HTMLAnchorElement>(null);
    const mySharedFilesRef = useRef<HTMLAnchorElement>(null);
    const sharedWithMeRef = useRef<HTMLAnchorElement>(null);
    const storageSpaceBarFillerRef = useRef<HTMLDivElement>(null);

    useMouseOutClassUpdate(myStorageRef.current!, 'mouseout', 0.3);
    useMouseOutClassUpdate(favoriteRef.current!, 'mouseout', 0.3);
    useMouseOutClassUpdate(mySharedFilesRef.current!, 'mouseout', 0.3);
    useMouseOutClassUpdate(sharedWithMeRef.current!, 'mouseout', 0.3);

    useEffect(() => {
        if (!user) return;
        const storageBar = storageSpaceBarFillerRef.current;
        if (!storageBar) return;
        setValBytesInStorage(bytesToGigabytes(user?.bytesInStorage || 0, 2));
        setValMaxStorageSpace(bytesToGigabytes(user?.maxStorageSpace || 0, 0));
        let percent = (user.bytesInStorage / user.maxStorageSpace) * 100;
        storageBar!.style.width = `${percent}%`;
    }, [user]);

    return (
        <div id="side-options-main-container" className={sideOptionsDisplay ? 'show' : ''}>
            <section id="side-options-username-container">
                <h6 title={user?.username || ''}>{user?.username || ''}</h6>
                <button className="custom-icon-btn" onClick={sideOptionsDisplayToggler}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </section>
            <div className="custom-horizontal-divider"></div>
            <section id="side-options-location-container">
                <ul>
                    <li>
                        <NavLink to="/my-storage" ref={myStorageRef}>
                            <span></span>
                            <div>
                                <i className="bi bi-archive"></i>
                            </div>
                            My Storage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorite" ref={favoriteRef} onClick={() => {
                            dispatch(setDirPath([[user?.rootStorageDir || 0, 'My Storage']]));
                            dispatch(clearCheckedList());
                        }}>
                            <span></span>
                            <div>
                                <i className="bi bi-heart"></i>
                            </div>
                            Favorite
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shared-with-me" ref={sharedWithMeRef} onClick={() => {
                            dispatch(setDirPath([[user?.rootStorageDir || 0, 'My Storage']]));
                            dispatch(clearCheckedList());
                        }}>
                            <span></span>
                            <div>
                                <i className="bi bi-people"></i>
                            </div>
                            Shared With Me
                        </NavLink>
                    </li>
                </ul>
            </section>
            <div className="custom-horizontal-divider"></div>
            <section id="side-options-storage-space-container">
                <div className="storage-space-bar">
                    <div ref={storageSpaceBarFillerRef} className="storage-space-bar-filler"></div>
                </div>
                <p
                    title='First, the storage space already in use and second, the maximum storage space for this account.'
                    className="storage-space-numbers">
                    {valBytesInStorage} GB of {valMaxStorageSpace} GB used
                </p>
            </section>
        </div>
    );
}

