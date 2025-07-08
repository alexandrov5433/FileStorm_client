import './storageViewLoader.sass';

import NumbersRowLoader from '../numbersRowLoader/NumbersRowLoader';

export default function StorageViewLoader() {
    return (
        <div id="storage-view-loader-main-container" className="flex-col-strech-wrapper">
            <section className="storage-view-cloud">
                <i className="bi bi-cloud-fill"></i>
            </section>
            <NumbersRowLoader/>
        </div>
    );
}