import './numbersRowLoader.sass';

import { useEffect, useRef, useState } from 'react';

export default function NumbersRowLoader() {
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
        <section className="numbers-row-loader-container anime-fade-in">
            <span>
                {
                    <>
                        <span>{pre}</span>
                        <span className="numbers-row-loader-the-one">1</span>
                        <span>{post}</span>
                    </>
                }
            </span>
        </section>
    );
}
