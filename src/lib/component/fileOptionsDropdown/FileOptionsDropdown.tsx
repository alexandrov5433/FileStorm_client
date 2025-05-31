import './fileOptionsDropdown.sass';

export default function FileOptionsDropdown() {
    return (
        <div className="dropdown file-options custom-icon-btn" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots-vertical"></i>
            <ul className="dropdown-menu custom-dropdown">
                <li>
                    <span className="dropdown-item">
                        <i className="bi bi-download"></i>
                        Download
                    </span>
                </li>
                <li>
                    <span className="dropdown-item red-item">
                        <i className="bi bi-trash3"></i>
                        Delete
                    </span>
                </li>
            </ul>
        </div>
    );
}

