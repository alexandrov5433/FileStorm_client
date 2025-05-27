import './sideOptions.sass';

export default function SideOptions({
    sideOptionsDisplay,
    sideOptionsDisplayToggler
} : {
    sideOptionsDisplay: boolean,
    sideOptionsDisplayToggler: () => void
}) {

    return (
        <div id="side-options-main-container" className={sideOptionsDisplay ? 'show' : ''}>
            <h3>Username here</h3>
            <button onClick={sideOptionsDisplayToggler}>Close</button>
        </div>
    );
}

