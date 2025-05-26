import './landing.sass';
import cloud from '../../assets/FileStorm_cloud.svg';

export default function Landing() {
    return (
        <div id="landing-main-container">
            {/* <h1>Landing</h1> */}

            <div id="landing-loader-container">
                <img id="cloud" src={cloud} alt="Clould" />
                <div id="rain-container">
                    <div id="raindrop-1">1</div>
                    <div id="raindrop-2">0</div>
                    <div id="raindrop-3">1</div>
                    <div id="raindrop-4">1</div>
                    <div id="raindrop-5">0</div>
                </div>
            </div>


        </div>
    );
}