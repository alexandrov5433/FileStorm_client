import { useEffect, useRef, useState } from 'react';
import './messenger.sass';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { setMessage } from '../../../lib/redux/slice/messenger';

export default function Messenger() {
    const dispatch = useAppDispatch();
    const { message } = useAppSelector(state => state.messenger);

    const [display, setDisplay] = useState(false);

    const timeoutIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!message) {
            setDisplay(false);
            return;
        }
        setDisplay(true);
        clearTimeout(timeoutIdRef.current || 0);
        const timeoutId = setTimeout(() => {
            setDisplay(false);
            timeoutIdRef.current = null;
        }, message.duration || 4000);
        timeoutIdRef.current = timeoutId;
    }, [message]);

    function hideMessage() {
        clearTimeout(timeoutIdRef.current || 0);
        timeoutIdRef.current = null;
        dispatch(setMessage(null));
    }

    return (
        <div id="messenger-main-container" className={display ? 'display' : 'hide'}>
            <section className="top">
                <span className={`title-container ${message?.type || ''}`}>
                    {
                        message?.type == 'positive' ?
                            <i className="bi bi-check-square-fill"></i>
                            : <i className="bi bi-x-square-fill"></i>
                    }
                    <span>{message?.title || ''}</span>
                </span>
                <button className="custom-icon-btn" onClick={hideMessage}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </section>
            <section className="bottom">
                <p>{message?.text || ''}</p>
            </section>
        </div>
    );
}