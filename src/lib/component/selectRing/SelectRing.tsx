import './selectRing.sass';

export default function SelectRing({
    entityMarker
} : {
    entityMarker: string
}) {
    return (
        <div className="select-ring-main-container">
            <input type="checkbox" name={entityMarker} id={entityMarker} />
            <label htmlFor={entityMarker}></label>
            <i className="bi bi-check"></i>
        </div>
    );
}