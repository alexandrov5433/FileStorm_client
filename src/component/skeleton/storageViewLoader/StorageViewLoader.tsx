import './storageViewLoader.sass';

import cloud from '../../../assets/FileStorm_cloud.svg';

export default function StorageViewLoader() {
    return (
        <div id="storage-view-loader-main-container" className="flex-col-strech-wrapper anime-fade-in">
            <section className="storage-view-loader-container">
                <div className="cloud-container">
                    <img src={cloud} alt="FileStorm cloud." />
                </div>
                <div className="numbers-container">
                    <p className="storage-loader-1">1</p>
                    <p className="storage-loader-2">0</p>
                    <p className="storage-loader-3">1</p>
                    <p className="storage-loader-4">0</p>
                </div>
                <div className="computer-container">
                    <i className="bi bi-laptop"></i>
                </div>
            </section>
        </div>
    );
}