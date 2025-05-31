import './navBar.sass';

import fileFtormLogo from '../../../assets/FileStorm_logo_slogan.png';

import { useEffect, useState } from 'react';

import { NavLink, useNavigate } from "react-router";
import type { Theme } from '../../../lib/definition/theme';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import accountRequest from '../../../lib/action/accountRequest';
import { setGuest } from '../../../lib/redux/slice/user';

export default function NavBar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user);

    const htmlElem = document.querySelector('html')!;

    const [currentTheme, setCurrentheme] = useState('dark');
    const [isLogoutBtnDisabled, setLogoutBtnDisabled] = useState(false);

    function toggleTheme() {
        const newTheme: Theme = {
            'dark': 'light',
            'light': 'dark'
        }[currentTheme || 'light']! as Theme;
        htmlElem?.setAttribute('data-bs-theme', newTheme);
        setCurrentheme(newTheme);
        setThemeLocalStorage(newTheme);
    }

    function getThemeLocalStorage() {
        let theme: Theme = localStorage.getItem('theme') as Theme || 'dark';
        if (!['light', 'dark'].includes(theme)) {
            theme = 'dark';
        }
        return theme;
    }

    function setThemeLocalStorage(theme: Theme) {
        localStorage.setItem('theme', theme);
    }

    useEffect(() => {
        const theme = getThemeLocalStorage();
        htmlElem?.setAttribute('data-bs-theme', theme);
        setCurrentheme(theme);
    }, []);

    async function logout() {
        setLogoutBtnDisabled(true);
        const res = await accountRequest(
            '/api/auth/logout',
            'GET'
        )
        if (res.status === 200) {
            dispatch(setGuest());
            navigate('/account/login');
        }
        setLogoutBtnDisabled(false);
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img id="fileStormLogo" src={fileFtormLogo} alt="FileStorm, files everywhere!" />
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-felx" id="navbarNav">
                    <ul className="navbar-nav pagesNav">
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink onClick={toggleTheme} className="nav-link" to="#">
                                {currentTheme == 'light' ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
                            </NavLink>
                        </li>
                    </ul>

                    <div id="navbar-user-container">
                            <p>{user.username}</p>
                            <span className="pipe">|</span>
                            <button id="logoutBtn" onClick={logout} disabled={isLogoutBtnDisabled} className="nav-link">Log Out</button>
                    </div>
                </div>

            </div>
        </nav>
    );
}