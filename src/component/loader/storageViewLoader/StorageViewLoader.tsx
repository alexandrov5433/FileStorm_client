import './storageViewLoader.sass';

export default function StorageViewLoader() {
    return (
        <div id="storage-view-loader-main-container" className="flex-col-strech-wrapper">
            <section className="storage-view-loader-container">
                <div className="cloud-container">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <i className="bi bi-cloud-fill"></i>
                </div>
                {/* <div className="numbers-container">
                    <p className="storage-loader-1">1</p>
                    <p className="storage-loader-2">0</p>
                    <p className="storage-loader-3">1</p>
                    <p className="storage-loader-4">0</p>
                </div>
                <div className="computer-container">
                    <i className="bi bi-laptop"></i>
                </div> */}
            </section>
        </div>
    );
}