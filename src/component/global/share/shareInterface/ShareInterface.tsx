import './shareInterface.sass';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/reduxTypedHooks';
import type { Chunk } from '../../../../lib/definition/chunk';
import { setMessage } from '../../../../lib/redux/slice/messenger';
import fetcher from '../../../../lib/action/fetcher';
import { addUserToShareWithRequest, changeShareOptionRequest, getUsersFromShareWithRequest, removeUserFromShareWithRequest, searchUsersRequest } from '../../../../lib/action/shareRequest';
import type { User } from '../../../../lib/definition/user';
import type { UsersAsNameAndId } from '../../../../lib/definition/fetcherReturn';
import { replaceChunkByIdWithNewChunk } from '../../../../lib/redux/slice/directory';
import { setShareInterfaceStateToNull } from '../../../../lib/redux/slice/shareInterface';

export default function ShareInterface() {
  const dispatch = useAppDispatch();
  const shareInterfaceState = useAppSelector(state => state.shareInterface);

  const [displayComponent, setDisplayComponent] = useState(false);
  const [chunk, setChunk] = useState<Chunk | null>(null);

  useEffect(() => {
    if (!shareInterfaceState) {
      setDisplayComponent(false);
      setDisplaySearchResults(false);
      setUsersFromSearch({});
      return;
    }
    setDisplayComponent(true);
    setChunk(shareInterfaceState.entity);
  }, [shareInterfaceState]);

  function closeShareInterface() {
    dispatch(setShareInterfaceStateToNull());
  }

  // status
  const displayStatus = useRef(false);
  const [statusLoading, setStatusLoading] = useState(false);

  // share option
  const [shareOptionUpdateLoading, setShareOptionUpdateLoading] = useState(false);

  async function shareOptionManualChange(e: ChangeEvent) {
    if (!chunk) return;
    const newShareOption = (e.target as HTMLSelectElement).value || '';
    if (chunk.shareOption === newShareOption) return;
    if (![
      'PRIVATE', 'SHARE_WITH_ALL_WITH_LINK', 'SHARE_WITH_USER'
    ].includes(newShareOption)) return;

    setShareOptionUpdateLoading(true);
    displayStatus.current = true;
    setStatusLoading(true);
    const res = await fetcher(changeShareOptionRequest(
      chunk.id,
      newShareOption as 'PRIVATE' | 'SHARE_WITH_ALL_WITH_LINK' | 'SHARE_WITH_USER'
    ));
    if (res.status === 200) {
      const updatedChunk = res.payload as Chunk;
      setChunk(updatedChunk);
      dispatch(replaceChunkByIdWithNewChunk({
        idOfChunkToRemove: chunk.id,
        chunkToAdd: updatedChunk
      }));
      setUsersFromShareWith({});
    } else {
      dispatch(setMessage({
        title: 'Ooops...',
        text: res.msg || 'A problem occurred. Please try again.',
        type: 'negative',
        duration: 5000
      }));
    }
    setShareOptionUpdateLoading(false);
    setStatusLoading(false);
  }

  // share link
  const writtinToClipboardInProgress = useRef(false);
  async function copyShareLinkToClipbord() {
    if (!chunk?.shareLink || writtinToClipboardInProgress.current) return;
    writtinToClipboardInProgress.current = true;
    await window.navigator.clipboard.writeText(chunk?.shareLink);
    dispatch(setMessage({
      title: 'Copied!',
      text: 'Copied to clipboard.',
      type: 'positive',
      duration: 3000
    }));
    writtinToClipboardInProgress.current = false;
  }

  // share with
  const [usersFromShareWith, setUsersFromShareWith] = useState<UsersAsNameAndId>({});

  useEffect(() => {
    if ((chunk?.shareWith || []).length <= 0) return;
    getUsersFromShareWith();
  }, [chunk]);

  async function getUsersFromShareWith() {
    if (!chunk?.id) return;
    displayStatus.current = true;
    setStatusLoading(true);
    const res = await fetcher(getUsersFromShareWithRequest(chunk.id));
    if (res.status === 200) {
      setUsersFromShareWith(res.payload as UsersAsNameAndId);
    } else {
      dispatch(setMessage({
        title: 'Ooops...',
        text: res.msg || 'A problem occurred. Please try again.',
        type: 'negative',
        duration: 5000
      }));
    }
    setStatusLoading(false);
  }

  async function removeUserFromShareWith(userId: number) {
    if (!chunk?.id) return;
    displayStatus.current = true;
    setStatusLoading(true);
    const res = await fetcher(removeUserFromShareWithRequest(chunk?.id, userId));
    if (res.status === 200) {
      setUsersFromShareWith(state => {
        return Object.entries(state).reduce((acc, cur) => {
          if (cur[1] == userId) return acc;
          (acc as any)[cur[0]] = cur[1];
          return acc;
        }, {});
      });
    } else {
      dispatch(setMessage({
        title: 'Ooops...',
        text: res.msg || 'A problem occurred. Please try again.',
        type: 'negative',
        duration: 5000
      }));
    }
    setStatusLoading(false);
  }


  // user search
  const searchUsersAbortController = useRef(new AbortController());
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [searchUsersLoading, setSearchUsersLoading] = useState(false);
  const [usersFromSearch, setUsersFromSearch] = useState<UsersAsNameAndId>({});

  async function searchUsers(e: ChangeEvent<HTMLInputElement>) {
    if (!chunk?.id) return;
    const searchValue = (e.target.value || '').replaceAll(/[^A-Za-z0-9_]/ig, '');
    if (!searchValue) {
      setDisplaySearchResults(false);
      setUsersFromSearch({});
      return;
    }
    setDisplaySearchResults(true);
    // searchUsersAbortController.current.abort();
    setSearchUsersLoading(true);
    const res = await fetcher(searchUsersRequest(searchValue, chunk.id, searchUsersAbortController.current));
    if (res.status === 200) {
      setUsersFromSearch(res.payload as UsersAsNameAndId);
    } else {
      dispatch(setMessage({
        title: 'Ooops...',
        text: res.msg || 'A problem occurred. Please try again.',
        type: 'negative',
        duration: 5000
      }));
    }
    setSearchUsersLoading(false);
  }

  async function addUserToShareWith(userId: number) {
    if (!chunk?.id) return;
    displayStatus.current = true;
    setStatusLoading(true);
    const res = await fetcher(addUserToShareWithRequest(chunk.id, userId));
    if (res.status === 200) {
      const user = res.payload as User;
      setUsersFromShareWith(state => {
        const newState = { ...state };
        Object.assign(newState, {
          [user.username]: user.id
        });
        return newState;
      });
      setUsersFromSearch(state => {
        return Object.entries(state).reduce((acc, cur) => {
          if (cur[1] == userId) return acc;
          (acc as any)[cur[0]] = cur[1];
          return acc;
        }, {});
      });
    } else {
      dispatch(setMessage({
        title: 'Ooops...',
        text: res.msg || 'A problem occurred. Please try again.',
        type: 'negative',
        duration: 5000
      }));
    }
    setStatusLoading(false);
  }

  return (
    <div id="share-interface-main-container" className={`anime-fade-in ${displayComponent ? 'share-interface-display' : ''}`}>
      <section id="share-interface-window">
        <div className="button-container">
          <button id="text-input-box-close-btn" className="custom-icon-btn" onClick={closeShareInterface}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="share-title-container">
          <h6><span>Share</span> {chunk?.originalFileName || ''}</h6>
        </div>
        {
          displayStatus.current ?
            <div className="status-container">
              {
                statusLoading ?
                  <div className="status">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span>Updating...</span>
                  </div>
                  :
                  <div className="status">
                    <i className="bi bi-check-lg"></i>
                    <span>Done</span>
                  </div>
              }
            </div>
            : ''
        }
        <div className="share-option-container margin-bottom">
          <span>Share Option</span>
          <select disabled={shareOptionUpdateLoading} className="form-select" aria-label="Default select example" onChange={shareOptionManualChange}>
            <option selected={chunk?.shareOption == 'PRIVATE'} value="PRIVATE">Private</option>
            <option selected={chunk?.shareOption == 'SHARE_WITH_ALL_WITH_LINK'} value="SHARE_WITH_ALL_WITH_LINK">All With Link</option>
            <option selected={chunk?.shareOption == 'SHARE_WITH_USER'} value="SHARE_WITH_USER">Share With User</option>
          </select>
        </div>
        {
          chunk?.shareOption === 'SHARE_WITH_USER' ?
            <div className="user-search-container margin-bottom">
              <label htmlFor="share-interface-search-username">Search For User</label>
              <input type="text" name="username" id="share-interface-search-username" placeholder='Type in username...' onChange={searchUsers} ref={searchInputRef} />
              {
                displaySearchResults ?
                  <ul className="search-results">
                    {
                      searchUsersLoading ?
                        <li className="status-holder">
                          <div className="status">
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <span>Searching...</span>
                          </div>
                        </li>
                        :
                        Object.entries(usersFromSearch).length <= 0 ?
                          <li className="status-holder">
                            <span>No Results.</span>
                          </li>
                          :
                          Object.entries(usersFromSearch).map(entry =>
                            <li key={entry[1]} onClick={() => addUserToShareWith(entry[1])}>
                              <div className="person-icon-and-username-container" >
                                <i className="bi bi-person-fill"></i>
                                <span>{entry[0]}</span>
                              </div>
                            </li>
                          )
                    }
                  </ul>
                  : ''
              }
            </div>
            : ''
        }
        {
          chunk?.shareLink && chunk?.shareOption === 'SHARE_WITH_ALL_WITH_LINK' ?
            <div className="share-link-container margin-bottom">
              <span>Share Link</span>
              <div className="share-link">
                <section>
                  <button id="text-input-box-close-btn" className="custom-icon-btn" onClick={copyShareLinkToClipbord}>
                    <i className="bi bi-clipboard2"></i>
                  </button>
                </section>
                <input type="text" readOnly value={chunk?.shareLink} />
              </div>
            </div>
            : ''
        }
        {
          chunk?.shareOption === 'SHARE_WITH_USER' ?
            <div className="shared-with-container margin-bottom">
              <span>Shared With</span>
              {
                Object.entries(usersFromShareWith || {}).length <= 0 ?
                  <div>
                    <span className="shared-with-no-users-in-list">No users in the share list. Please, search for an user and add them.</span>
                  </div>
                  :
                  <ul>
                    {
                      Object.entries(usersFromShareWith || {}).map(entry =>
                        <li key={entry[1]}>
                          <div className="person-icon-and-username-container">
                            <i className="bi bi-person-fill"></i>
                            <span>{entry[0] || ''}</span>
                          </div>
                          <div className="button-container">
                            <button type="button" className="custom-btn w-fit-cont size-small red-btn" onClick={() => removeUserFromShareWith(entry[1])}>Remove</button>
                          </div>
                        </li>
                      )
                    }
                  </ul>
              }
            </div>
            : ''
        }
      </section>
    </div>
  );
}