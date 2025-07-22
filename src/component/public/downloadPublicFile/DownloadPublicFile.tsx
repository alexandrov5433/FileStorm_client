import './downloadPublicFile.sass';

import { NavLink, useParams } from 'react-router';
import fetcher from '../../../lib/action/fetcher';
import { getPublicFileDataRequest } from '../../../lib/action/fileSystem/fileRequest';
import { useEffect, useState } from 'react';
import type { Chunk } from '../../../lib/definition/chunk';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { setMessage } from '../../../lib/redux/slice/messenger';
import RainingClouldLoader from '../../loader/rainingClouldLoader/RainingClouldLoader';
import { bytesToMegabytes } from '../../../lib/util/convert';
import { extractFileExtentionWithoutDot } from '../../../lib/util/file';

export default function DownloadPublicFile() {
    const { chunkIdToDownload } = useParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [chunk, setChunk] = useState<Chunk | null>(null);
    const [fileFound, setFileFound] = useState(true);

    const shareLink = encodeURI('https://filestorm.pro');
    const shareMessage = 'Hey, check out this file sharing service called FileStorm.';
    const shareTitle = 'FileStorm - file sharing and storage.';

    useEffect(() => {
        getDataOfChunk();
    }, []);

    async function getDataOfChunk() {
        const res = await fetcher(getPublicFileDataRequest(Number(chunkIdToDownload || 0) || 0));
        if (res.status === 200) {
            setChunk(res.payload as Chunk);
            setFileFound(true);
        } else {
            setFileFound(false);
            dispatch(setMessage({
                title: 'Ooops...',
                text: res.msg || 'A problem occurred. Please try again.',
                type: 'negative',
                duration: 5000
            }));
        }
    }

    return (
        <div id="dpf-main-container" className="wrapper anime-fade-in">
            <section id="main-section">
                <section id="file-section">
                    <h1 className="noto-sans-font">FileStorm</h1>
                    {
                        fileFound ?
                            <>
                                <h5>Download Public File</h5>

                                <div id="file-info">
                                    <div className="info-row">
                                        <span>Name:&nbsp;</span>
                                        <span id="file-name">{chunk?.originalFileName || ''}</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Size:&nbsp;</span>
                                        <span>{bytesToMegabytes(chunk?.sizeBytes || 0, 2)} MB</span>
                                    </div>
                                    <div className="info-row">
                                        <span>Type:&nbsp;</span>
                                        <span>{extractFileExtentionWithoutDot(chunk?.originalFileName || '')}</span>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <h5>File not found! Possible reasons:</h5>
                                <ol id="file-not-found-reasons">
                                    <li>
                                        <span><i>Wrong ID</i> at the end of the URL.</span>
                                    </li>
                                    <li>
                                        <span>The owner has stopped sharing this file and it is therefore <i>not publicly available</i>.</span>
                                    </li>
                                    <li>
                                        <span>The file was <i>deleted</i> by the owner.</span>
                                    </li>
                                </ol>
                            </>
                    }
                    {
                        fileFound ?
                            <a id="download-link"
                                className="custom-btn main-btn"
                                download
                                target="_self"
                                href={`/api/public/file/${chunkIdToDownload || 0}/download`}
                            >
                                Download
                            </a>
                            : ''
                    }
                </section>
                <div className="custom-horizontal-divider"></div>
                <section id="account-section">
                    <p>Want to share files?</p>
                    {
                        user && user?.id ?
                            <NavLink to={'/my-storage'} className="custom-btn secondary-btn w-fit-cont">
                                My Storage
                            </NavLink>
                            :
                            <>
                                <NavLink to={'/account/register'} className="custom-btn secondary-btn w-fit-cont">
                                    Create Account
                                </NavLink>
                                <p>or</p>
                                <NavLink to={'/account/login'} className="custom-btn secondary-btn w-fit-cont">
                                    Log In
                                </NavLink>
                            </>
                    }
                </section>
                <div className="custom-horizontal-divider"></div>
                <section id="share-section">
                    <p>{'Share our service with friends! :)'}</p>
                    <div>
                        <a
                            target="_blank"
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`} className="custom-icon-btn"
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a
                            target="_blank"
                            href={`http://www.reddit.com/submit?url=${shareLink}&title=${shareTitle}`} className="custom-icon-btn"
                        >
                            <i className="bi bi-reddit"></i>
                        </a>
                        <a
                            target="_blank"
                            href={`https://www.facebook.com/share.php?u=${shareLink}`} className="custom-icon-btn"
                        >
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a
                            target="_blank"
                            href={`https://api.whatsapp.com/send?text=${shareMessage}: ${shareLink}`} className="custom-icon-btn"
                        >
                            <i className="bi bi-whatsapp"></i>
                        </a>
                        <a
                            target="_blank"
                            href={`https://telegram.me/share/url?url=${shareLink}&text=${shareMessage}`} className="custom-icon-btn"
                        >
                            <i className="bi bi-telegram"></i>
                        </a>
                        <a
                            target="_blank"
                            href={`http://twitter.com/share?&url=${shareLink}&text=${shareMessage}&hashtags=javascript,programming`} className="custom-icon-btn"
                        >
                            <i className="bi bi-twitter-x"></i>
                        </a>
                    </div>
                </section>
            </section>

            <section id="storm-section">
                <RainingClouldLoader />
            </section>
        </div>
    );
}