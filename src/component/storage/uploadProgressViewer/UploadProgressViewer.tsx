import type { UploadProgressEntity } from '../../../lib/definition/redux';
import { useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import './uploadProgressViewer.sass';

import { useEffect, useState } from 'react';

export default function UploadProgressViewer() {
    const uploadProgress = useAppSelector(state => state.uploadProgress);

    const [isMainContainerExpanded, setMainContainerExpanded] = useState(false);

    useEffect(() => {
        console.log(uploadProgress);
        
    }, [uploadProgress]);

    function uploadProgressEntityMapper(entity: UploadProgressEntity) {
        return (
            <section className="upload-container anime-fade-in" key={entity.id}>
                <div className="top">
                    <section className="spinner-container">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </section>
                    <section className="status">
                        <p>{entity.actionInProgress}</p>
                    </section>
                    <section className="custom-icon-btn">
                        <i className="bi bi-x-lg"></i>
                    </section>
                </div>
                <div className="middle">
                    <p>{entity.fileName}</p>
                </div>
                <div className="bottom">
                    <span className="progress-bar" data-progress={entity.progress}></span>
                </div>
            </section>
        );
    }

    return (
        <div id="upload-progress-viewer-main-container" className={isMainContainerExpanded ? 'expand' : ''}>
            <div className="expand-btn-container anime-fade-in">
                <button className="custom-btn" onClick={() => setMainContainerExpanded(state => !state)}>
                    {isMainContainerExpanded ? <i className="bi bi-arrow-down"></i> : <i className="bi bi-arrow-up"></i>}

                    {isMainContainerExpanded ? 'Collaps' : 'Expand'}
                </button>
            </div>

            {uploadProgress.map(uploadProgressEntityMapper)}

        </div>
    );
}