import './checkedEntitiesOptions.sass';

import { useAppSelector } from '../../../../../lib/redux/reduxTypedHooks';

export default function CheckedEntitiesOptions() {
    const { renderOptions } = useAppSelector(state => state.checkedEntities);

    return (
        <div id="check-ent-options-main-cantainer" className="anime-fade-in">
            {
                renderOptions.download ?
                    <button className="custom-btn w-fit-cont size-medium secondary-btn">
                        <i className="bi bi-download color-teal"></i>&nbsp;Download Selected
                    </button>
                    : ''
            }
            {
                renderOptions.delete ?
                    <button className="custom-btn w-fit-cont size-medium secondary-btn">
                        <i className="bi bi-trash3 color-red"></i>&nbsp;Delete Selected
                    </button>
                    : ''
            }
        </div>
    );
}