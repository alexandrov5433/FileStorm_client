import './landing.sass';

import { useAppDispatch } from '../../lib/redux/reduxTypedHooks';
import { useEffect } from 'react';
import { setLandingMounted } from '../../lib/redux/slice/landing';
import RainingClouldLoader from '../loader/rainingClouldLoader/RainingClouldLoader';

export default function Landing() {   
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setLandingMounted(true));
    }, []);

    return (
        <div id="landing-main-container">
            <RainingClouldLoader/>
        </div>
    );
}