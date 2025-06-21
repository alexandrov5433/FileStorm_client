import './checkedEntitiesOptions.sass';

export default function CheckedEntitiesOptions() {
    return (
        <div id="check-ent-options-main-cantainer" className="anime-fade-in">
            <button className="custom-btn w-fit-cont size-medium secondary-btn">
                <i className="bi bi-download color-teal"></i>&nbsp;Download Selected
            </button>
            <button className="custom-btn w-fit-cont size-medium secondary-btn">
                <i className="bi bi-trash3 color-red"></i>&nbsp;Delete Selected
            </button>
        </div>
    );
}