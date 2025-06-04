import './emptyDirectory.sass';

export default function EmptyDirectory({
    textContent = 'Empty Directory.',
    icon = 'directory'
}: {
    textContent?: string,
    icon?: 'directory' | 'file'
}) {
    return (
        <div id="empty-directory-main-container">
            {
                icon == 'directory' ?
                <i className="bi bi-folder2-open"></i>
                : <i className="bi bi-file-earmark"></i>
            }
            <p>{textContent}</p>
        </div>
    );
}