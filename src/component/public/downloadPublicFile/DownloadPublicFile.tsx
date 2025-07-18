import './downloadPublicFile.sass';

import { NavLink, useParams } from 'react-router';
import fetcher from '../../../lib/action/fetcher';
import { getPublicFileDataRequest } from '../../../lib/action/fileSystem/fileRequest';
import { useEffect, useRef, useState } from 'react';
import type { Chunk } from '../../../lib/definition/chunk';
import { useAppDispatch } from '../../../lib/redux/reduxTypedHooks';
import { setMessage } from '../../../lib/redux/slice/messenger';
import RainingClouldLoader from '../../loader/rainingClouldLoader/RainingClouldLoader';
import { bytesToMegabytes } from '../../../lib/util/convert';

export default function DownloadPublicFile() {
    const { chunkIdToDownload } = useParams();
    const dispatch = useAppDispatch();

    const [chunk, setChunk] = useState<Chunk | null>(null);

    const downloadAnchorRef = useRef<HTMLAnchorElement>(null);
    const firstClickDone = useRef<boolean>(false);

    const shareLink = encodeURI('TODO: add actual link with the real domain');
    const shareMessage = 'Hey, check out this file sharing service called FileStorm.';
    const shareTitle = 'FileStorm - file sharing and storage.';

    useEffect(() => {
        getDataOfChunk();
        if (!firstClickDone.current) {
            clickDownloadFile();
        }
    }, []);

    async function getDataOfChunk() {
        const res = await fetcher(getPublicFileDataRequest(Number(chunkIdToDownload || 0) || 0));
        if (res.status === 200) {
            setChunk(res.payload as Chunk);
        } else {
            dispatch(setMessage({
                title: 'Ooops...',
                text: res.msg || 'A problem occurred. Please try again.',
                type: 'negative',
                duration: 5000
            }));
        }
    }

    function clickDownloadFile() {
        if (!downloadAnchorRef.current) return;
        firstClickDone.current = true;
    }

    return (
        <div id="dpf-main-container" className="wrapper anime-fade-in">
            <section id="main-section">
                <section id="file-section">
                    <h1 className="noto-sans-font">FileStorm</h1>
                    <h5>Download Public File:</h5>

                    <div id="file-info">
                        <div className="info-row">
                            <span>Name:&nbsp;</span>
                            <span id="file-name">{chunk?.originalFileName || ''}</span>
                        </div>
                        <div>
                            <span>Size:&nbsp;</span>
                            <span>{bytesToMegabytes(chunk?.sizeBytes || 0, 2)} MB</span>
                        </div>
                        <div>
                            <span>Type:&nbsp;</span>
                            <span>{chunk?.mimeType || ''}</span>
                        </div>
                    </div>

                    <a id="download-link"
                        className="custom-btn main-btn"
                        download
                        target="_self"
                        ref={downloadAnchorRef}
                        href={`/api/public/file/${chunkIdToDownload || 0}/download`}
                    >
                        Download
                    </a>
                </section>
                <div className="custom-horizontal-divider"></div>
                <section id="account-section">
                    <p>Want to share files?</p>
                    <NavLink to={'/account/register'} className="custom-btn secondary-btn w-fit-cont">
                        Create Account
                    </NavLink>
                    <p>or</p>
                    <NavLink to={'/account/login'} className="custom-btn secondary-btn w-fit-cont">
                        Log In
                    </NavLink>
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