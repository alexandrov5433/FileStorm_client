import { useEffect, useRef, useState } from 'react';
import './account.sass';
import { Outlet, useNavigate } from 'react-router';
import { useAppSelector } from '../../lib/redux/reduxTypedHooks';

export default function Account() {
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const emphasysWordRef = useRef(null);
    const [emphasysWord, setEmphasysWord] = useState("easy");
    
    useEffect(() => {
        const interval  = setInterval(() => {
            (emphasysWordRef.current! as HTMLHeadingElement).classList.remove("account-emphasys-word-animation");

            setEmphasysWord(currentWord => {
                const dict = {
                    "easy": "available",
                    "available": "shareable",
                    "shareable": "fun",
                    "fun": "easy"
                }
                return (dict as any)[currentWord];
            });

            // resets the animation state
            (emphasysWordRef.current! as HTMLHeadingElement).offsetWidth;
            (emphasysWordRef.current! as HTMLHeadingElement).classList.add("account-emphasys-word-animation");
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (user?.id && user?.id > 0) {
            navigate('/my-storage');
        }
    }, [user]);

    return (
        <div id="account-main-container">
            <div id="account-side-content">
                <svg id="account-panorama" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                        {/* <!-- Sunset gradient for sky --> */}
                        <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#ff6f91" />
                            <stop offset="50%" stop-color="#ffcc70" />
                            <stop offset="100%" stop-color="#ffeaa7" />
                        </linearGradient>

                        {/* <!-- Cloud gradient --> */}
                        <linearGradient id="cloudFill" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#ffd6e0" />
                            <stop offset="100%" stop-color="#ffb347" />
                        </linearGradient>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#sunsetSky)" />


                    <g className="cloud" fill="url(#cloudFill)" opacity="0.8">
                        <path d="M200 120
                        c-30 -30 -90 -30 -120 0
                        c-40 -20 -100 0 -90 50
                        h240
                        c10 -40 -20 -60 -30 -50
                        z" />
                        <path d="M100,200 
                        C80,160 140, 140 160,160 
                        C170,130 230,130 240,160 
                        C260,130 320,140 310,170 
                        C340,170 360,190 340,200 
                        Q320,200 300,200 
                        Q100
                        Q100,210 100,200 
                        Z" />
                        <path d="M950 100
                        c-30 -30 -90 -30 -120 0
                        c-100 -20 -100 10 -100 50
                        h240
                        c50 -10 30 -60 -50 -50
                        z" />
                    </g>

                    <path className="wave-1" fill="#20c997" d="M0,600 C360,720 1080,480 1440,600 L1440,800 L0,800 Z"></path>
                    <path className="wave-2" fill="#5dd8b5" d="M0,660 C400,780 1040,540 1440,660 L1440,800 L0,800 Z"></path>
                    <path className="wave-3" fill="#a0e5d0" d="M0,720 C440,840 1000,600 1440,720 L1440,800 L0,800 Z"></path>
                </svg>
                <div id="accound-side-message">
                    <h1>Files made:</h1>
                    <h1 ref={emphasysWordRef} className="account-emphasys-word-animation" id="accound-emphasys-word">{emphasysWord}</h1>
                </div>
            </div>
            <Outlet />
        </div>
    );
}