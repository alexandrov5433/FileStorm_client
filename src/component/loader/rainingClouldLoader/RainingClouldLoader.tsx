import './rainingClouldLoader.sass';

import cloud from '../../../assets/FileStorm_cloud.svg';

export default function RainingClouldLoader() {
    return (
        <div id="rainig-clould-loader-container">
            <img id="cloud" src={cloud} alt="Clould" />
            <div id="rain-container">
                <div id="raindrop-1">1</div>
                <div id="raindrop-2">0</div>
                <div id="raindrop-3">1</div>
                <div id="raindrop-4">1</div>
                <div id="raindrop-5">0</div>
            </div>
        </div>
    );
}