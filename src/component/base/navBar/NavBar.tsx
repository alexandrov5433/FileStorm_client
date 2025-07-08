import './navBar.sass';

import fileFtormLogo from '../../../assets/FileStorm_logo_slogan.png';

import { useEffect, useRef, useState } from 'react';

import { NavLink, useNavigate } from "react-router";
import type { Theme } from '../../../lib/definition/theme';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import accountRequest from '../../../lib/action/accountRequest';
import { setGuest } from '../../../lib/redux/slice/user';
import { setDirPath, setDirPathToInitialState } from '../../../lib/redux/slice/directory';
import { setShareInterfaceStateToNull } from '../../../lib/redux/slice/shareInterface';
import { useControllComboKeyBind } from '../../../lib/hook/useKeyBind';
import { getIconElement } from '../../../lib/util/file';
import fetcher from '../../../lib/action/fetcher';
import { getSearchUserFilesRequest } from '../../../lib/action/fileSystem/fileRequest';
import { setMessage } from '../../../lib/redux/slice/messenger';
import { useEventListenerForRef } from '../../../lib/hook/eventListener';
import type { FileSearchResult, UserFileSearchResults } from '../../../lib/definition/search';
import NumbersRowLoader from '../../loader/numbersRowLoader/NumbersRowLoader';
import { setScrollTargetInFileStorage } from '../../../lib/redux/slice/fileStorageScroll';

export default function NavBar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user);
    const { newlyDeletedChunks } = useAppSelector(state => state.directory);

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
            dispatch(setDirPathToInitialState());
            dispatch(setShareInterfaceStateToNull());
            navigate('/account/login');
        }
        setLogoutBtnDisabled(false);
    }

    // file search logic
    const fileSearchInputRef = useRef<HTMLInputElement | null>(null);
    const navFileSearchContainerRef = useRef<HTMLLIElement | null>(null);
    const [searchResults, setSearchResults] = useState<UserFileSearchResults | null>(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    useControllComboKeyBind(fileSearchInputRef.current!, 'k', 'focus');
    useEventListenerForRef(fileSearchInputRef, 'keydown', searchInitiateListener);
    useEventListenerForRef(fileSearchInputRef, 'blur', closeResultsOnBlurListener);
    useEventListenerForRef(fileSearchInputRef, 'focus', openeResultsOnFocusIfPresentListener);

    useEffect(() => {
        if (!newlyDeletedChunks || !searchResults) return;
        setSearchResults(state => {
            if (!state) return state;

            const newMyStorageResults = state?.myStorageResults.reduce((acc, cur) => {
                if (newlyDeletedChunks.includes(cur.chunk.id)) {
                    return acc;
                }
                acc.push(cur);
                return acc;
            }, [] as FileSearchResult[]);

            return {
                myStorageResults: newMyStorageResults || [],
                sharedWithMeResults: state?.sharedWithMeResults || []
            };
        });
    }, [newlyDeletedChunks]);

    async function searchInitiateListener(e: KeyboardEvent) {
        const searchValue = fileSearchInputRef.current?.value || '';
        if (!searchValue || searchValue.length == 0) {
            setShowSearchResults(false);
            setSearchLoading(false);
            setSearchResults(null);
            return;
        }
        if (searchValue && e.key == 'Enter') {
            setSearchLoading(true);
            setShowSearchResults(true);
            const res = await fetcher(getSearchUserFilesRequest(searchValue));
            if (res.status === 200) {
                console.log(res.payload as UserFileSearchResults);
                setSearchResults(res.payload as UserFileSearchResults);
            } else {
                dispatch(setMessage({
                    title: 'Ooops...',
                    text: res.msg || 'A problem occurred. Please try again.',
                    type: 'negative',
                    duration: 5000
                }));
            }
            setSearchLoading(false);
        }
    }

    function closeResultsOnBlurListener(e: FocusEvent) {
        if ((e.relatedTarget as any)?.dataset?.searchnoblur) {
            return;
        }
        setShowSearchResults(false);
    }

    function openeResultsOnFocusIfPresentListener() {
        if (searchResults) {
            setShowSearchResults(true);
        }
    }

    function navigateToChunkInMyStorage(e: MouseEvent, result: FileSearchResult) {
        e.stopPropagation();
        setShowSearchResults(false);
        dispatch(setDirPath(result.directoryPath || [[user?.id || 0, 'My Storage']]));
        navigate(`/my-storage`);
        dispatch(setScrollTargetInFileStorage(`scroll-to-id-${result.chunk.id}`));
    }

    function navigateToChunkInSharedWithMe(e: MouseEvent, result: FileSearchResult) {
        e.stopPropagation();
        setShowSearchResults(false);
        dispatch(setDirPath([[user?.id || 0, 'My Storage']]));
        navigate(`/shared-with-me`);
        dispatch(setScrollTargetInFileStorage(`scroll-to-id-${result.chunk.id}`));
    }



    function resultsMapperMyStorage(results: FileSearchResult[]) {
        return (
            <section className="search-results-list">
                {
                    (results || []).length <= 0 ? <span className="search-results-no-result-msg">No results.</span> :
                        (results || []).map(result =>
                            <button
                                onClick={e => navigateToChunkInMyStorage(e as any, result)}
                                key={result.chunk.id}
                                className="search-results-result button-as-container"
                                data-searchnoblur={true}>
                                <div className="search-results-icon">
                                    {getIconElement(result.chunk.mimeType)}
                                </div>
                                <div className="search-results-filename">
                                    <span>{result.chunk.originalFileName}</span>
                                </div>
                                <div className="search-results-button">
                                    <button
                                        data-searchnoblur={true}
                                        onClick={e => navigateToChunkInMyStorage(e as any, result)}
                                        type="button"
                                        className="custom-btn secondary-btn w-fit-cont size-small">
                                        Go To
                                    </button>
                                </div>
                            </button >
                        )
                }
            </section >
        );
    }
    function resultsMapperSharedWithMe(results: FileSearchResult[]) {
        return (
            <section className="search-results-list">
                {
                    (results || []).length <= 0 ? <span className="search-results-no-result-msg">No results.</span> :
                        (results || []).map(result =>
                            <button
                                onClick={e => navigateToChunkInSharedWithMe(e as any, result)}
                                key={result.chunk.id}
                                className="search-results-result button-as-container"
                                data-searchnoblur={true}>
                                <div className="search-results-icon">
                                    {getIconElement(result.chunk.mimeType)}
                                </div>
                                <div className="search-results-filename">
                                    <span>{result.chunk.originalFileName}</span>
                                </div>
                                <div className="search-results-button">
                                    <button
                                        onClick={e => navigateToChunkInSharedWithMe(e as any, result)}
                                        data-searchnoblur={true}
                                        type="button"
                                        className="custom-btn secondary-btn w-fit-cont size-small">
                                        Go To
                                    </button>
                                </div>
                            </button>
                        )
                }
            </section>
        );
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
                        <li className="nav-item">
                            <NavLink onClick={toggleTheme} className="nav-link" to="#">
                                {currentTheme == 'light' ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
                            </NavLink>
                        </li>
                        <li ref={navFileSearchContainerRef} id="nav-file-search-container" className="nav-item">
                            <input
                                ref={fileSearchInputRef}
                                type="text"
                                name="nav-file-search"
                                id="nav-file-search"
                                placeholder="Type filename and hit Enter" />
                            <span id="nav-file-search-keybind">Ctrl + K</span>
                            {
                                showSearchResults ?
                                    <div id="file-search-results-container">
                                        {
                                            searchLoading ?
                                                <div className="file-search-loader-container">
                                                    <p>Searching</p>
                                                    <NumbersRowLoader />
                                                </div> :
                                                <>
                                                    <section className="search-results-title"><span>My Storage</span></section>
                                                    {
                                                        resultsMapperMyStorage(searchResults?.myStorageResults || [])
                                                    }

                                                    <section className="search-results-title"><span>Shared With Me</span></section>
                                                    {
                                                        resultsMapperSharedWithMe(searchResults?.sharedWithMeResults || [])
                                                    }
                                                </>
                                        }

                                    </div>
                                    : ''
                            }
                        </li>
                    </ul>

                    <div id="navbar-user-container">
                        <p>{user?.username || ''}</p>
                        <span className="pipe">|</span>
                        <button id="logoutBtn" onClick={logout} disabled={isLogoutBtnDisabled} className="nav-link">Log Out</button>
                    </div>
                </div>

            </div>
        </nav>
    );
}