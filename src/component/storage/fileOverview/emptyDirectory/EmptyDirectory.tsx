import './emptyDirectory.sass';

export default function EmptyDirectory({ textContent = 'Empty Directory.' }: { textContent?: string }) {
    return (
        <div id="empty-directory-main-container">
            <i className="bi bi-folder2-open"></i>
            <p>{textContent}</p>
        </div>
    );
}