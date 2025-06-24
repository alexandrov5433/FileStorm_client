import './storageViewLoader.sass';

import { useEffect, useRef, useState } from 'react';

export default function StorageViewLoader() {
    const position = useRef(0);
    const [pre, setPre] = useState('');
    const [post, setPost] = useState('000000000');

    useEffect(() => {
        const intervalId = setInterval(() => numbersUpdater(), 100);
        return () => clearInterval(intervalId);
    }, []);

    function numbersUpdater() {
        const preString = new Array(position.current).fill('0', 0).join('');
        setPre(preString);
        const postString = new Array(9 - position.current).fill('0', 0).join('');
        setPost(postString);
        // with 10 numbers
        position.current = position.current <= 8 ? (position.current + 1) : 0;
    }

    return (
        <div id="storage-view-loader-main-container" className="flex-col-strech-wrapper">
            <section className="storage-view-cloud">
                <i className="bi bi-cloud-fill"></i>
            </section>
            <section className="storage-view-numbers anime-fade-in">
                <span>
                    {
                        <>
                            <span>{pre}</span>
                            <span className="storage-view-the-one">1</span>
                            <span>{post}</span>
                        </>
                    }
                </span>
            </section>
        </div>
    );
}