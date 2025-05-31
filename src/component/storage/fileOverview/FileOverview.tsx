import FileOptionsDropdown from '../../../lib/component/fileOptionsDropdown/FileOptionsDropdown';
import SelectRing from '../../../lib/component/selectRing/SelectRing';
import type { HydratedDirectoryReference } from '../../../lib/definition/hydratedDirectoryReference';
import DirectoryIcon from '../../../lib/svgComponent/DirectoryIcon';
import PDFIcon from '../../../lib/svgComponent/PDFIcon';
import './fileOverview.sass';

export default function FileOverview({
    hydratedDirectoryReference
}: {
    hydratedDirectoryReference: HydratedDirectoryReference | null
}) {
    return (
        <div id="file-overview-main-container">

            <div className="file-table-wrapper">
                <div className="file-table">
                    <div className="file-table-header">
                        <div className="file-col selector">
                            <SelectRing entityMarker="all" />
                        </div>
                        <div className="file-col type">
                            <i className="bi bi-file-earmark"></i>
                        </div>
                        <div className="file-col name">Name</div>
                        <div className="file-col size">Size</div>
                        <div className="file-col created">Created</div>
                    </div>

                    <div className="file-table-body">

                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                        <div className="file-row">
                            <div className="file-col selector">
                                <SelectRing entityMarker="test" />
                            </div>
                            <div className="file-col type">
                                <PDFIcon></PDFIcon>
                            </div>
                            <div className="file-col name">
                                <p className="text-content">Some file</p>
                                <FileOptionsDropdown />
                            </div>
                            <div className="file-col size">
                                <p className="text-content">500 MB</p>
                            </div>
                            <div className="file-col created">
                                <p className="text-content">May 29, 2025; 20:30</p>
                            </div>
                        </div>
                   

                    </div>
                </div>
            </div>
        </div>
    );
}