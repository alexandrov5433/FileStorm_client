import './myStorage.sass';
import StorageViewLoader from '../../../skeleton/storageViewLoader/StorageViewLoader';

export default function MyStorage() {
    // add "active" class to active crumb
    return (
        <div id="my-storage-main-container" className="flex-col-strech-wrapper">
            {/* <section id="my-storage-breadcrumb-container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" aria-current="page">My Storage</li>
                    </ol>
                </nav>
            </section> */}
            <StorageViewLoader/>
        </div>
    );
}