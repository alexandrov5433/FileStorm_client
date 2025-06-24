import StorageViewLoader from '../../../loader/storageViewLoader/StorageViewLoader';
import './mySharedFiles.sass';

export default function MySharedFiles() {
    return (
        <div id="my-shared-files-main-container" className="flex-col-strech-wrapper">
            <h1>My Shared Files</h1>
            <StorageViewLoader/>
        </div>
    );
}