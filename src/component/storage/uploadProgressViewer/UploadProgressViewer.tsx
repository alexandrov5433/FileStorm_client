import './uploadProgressViewer.sass';
import { useState } from 'react';

export default function UploadProgressViewer() {
    const [isMainContainerExpanded, setMainContainerExpanded] = useState(false);

    return (
        <div id="upload-progress-viewer-main-container" className={isMainContainerExpanded ? 'expand' : ''}>
            <div className="expand-btn-container anime-fade-in">
                <button className="custom-btn" onClick={() => setMainContainerExpanded(state => !state)}>
                    {isMainContainerExpanded ? <i className="bi bi-arrow-down"></i> : <i className="bi bi-arrow-up"></i>}
                    
                    {isMainContainerExpanded ? 'Collaps' : 'Expand'}
                </button>
            </div>

            <section className="upload-container anime-fade-in">
                <div className="top">
                    <section className="spinner-container">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </section>
                    <section className="status">
                        <p>Uploading...</p>
                    </section>
                    <section className="custom-icon-btn">
                        <i className="bi bi-x-lg"></i>
                    </section>
                </div>
                <div className="middle">
                    <p>My-new-book-something-else.pdf fsdsadfasdf</p>
                </div>
                <div className="bottom">
                    <span className="progress-bar"></span>
                </div>
            </section>

        </div>
    );
}