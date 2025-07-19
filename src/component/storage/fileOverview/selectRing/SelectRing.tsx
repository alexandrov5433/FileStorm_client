import './selectRing.sass';

import { useEffect, useRef, type RefObject } from 'react';
import type { SelectorManipulationObject } from '../../../../lib/definition/selectRing';
import { useEventListenerForRef } from '../../../../lib/hook/eventListener';
import type { CheckedEntityActionPayload } from '../../../../lib/definition/checkedEntitiesOptionsTypes';

export default function SelectRing({
    HTMLInputElementId,
    entityType,
    entityId,
    addToCheckedList,
    removeFromCheckedList,
    selectAllInDirectory,
    unselectAllInDirectory,
    addSelectorManipulationObject,
    addMasterSelectorManipulationObject
}: {
    HTMLInputElementId: string,
    entityType?: 'chunk' | 'directory',
    entityId?: number,
    addToCheckedList?: (entity: CheckedEntityActionPayload) => void,
    removeFromCheckedList?: (entity: CheckedEntityActionPayload) => void,
    selectAllInDirectory?: () => void,
    unselectAllInDirectory?: () => void,
    addSelectorManipulationObject?: (selectorManipulationObject: SelectorManipulationObject) => void,
    addMasterSelectorManipulationObject?: (selectorManipulationObject: SelectorManipulationObject) => void
}) {
    const checkboxRef = useRef<HTMLInputElement>(null);

    // for master selector
    if (selectAllInDirectory && unselectAllInDirectory && addMasterSelectorManipulationObject) {
        useEventListenerForRef(checkboxRef as RefObject<HTMLElement>, 'change', checkAllListener);
        useEffect(() => {
            if (!checkboxRef.current) return;
            addMasterSelectorManipulationObject?.({
                entity: { entityId: 0, entityType: 'chunk' }, // the entity is irrelevant for the master selector; only the methods are used
                check: () => {
                    if (!checkboxRef.current) return;
                    checkboxRef.current!.checked = true;
                },
                uncheck: () => {
                    if (!checkboxRef.current) return;
                    checkboxRef.current!.checked = false;
                }
            });
        }, [checkboxRef, checkboxRef.current]);
    }
    function checkAllListener(e: Event) {
        const isChecked = (e.target as HTMLInputElement)?.checked;
        isChecked ? selectAllInDirectory?.() : unselectAllInDirectory?.();
    }

    // for individual selectors
    if (entityId && entityType && addToCheckedList && removeFromCheckedList && addSelectorManipulationObject) {
        useEventListenerForRef(checkboxRef as RefObject<HTMLElement>, 'change', checkSingleListener);
        useEffect(() => {
            if (!checkboxRef.current) return;
            addSelectorManipulationObject?.({
                entity: { entityId: entityId || 0, entityType: entityType! },
                check: () => {
                    const isChecked = checkboxRef.current?.checked;
                    if (isChecked == false) checkboxRef.current?.click();
                },
                uncheck: () => {
                    const isChecked = checkboxRef.current?.checked;
                    if (isChecked) checkboxRef.current?.click();
                }
            });
        }, [checkboxRef, checkboxRef.current]);
    }
    function checkSingleListener(e: Event) {
        if (!entityId || !entityType) return;
        const isChecked = (e.target as HTMLInputElement)?.checked;
        if (isChecked) {
            addToCheckedList?.({ entityId: Number(entityId) || 0, entityType: entityType! });
        } else {
            removeFromCheckedList?.({ entityId: Number(entityId) || 0, entityType: entityType! });
        }
    }

    return (
        <div
            title={
                selectAllInDirectory && unselectAllInDirectory && addMasterSelectorManipulationObject ?
                    'Select all element in this directory' : `Select this ${entityType == 'chunk' ? 'file' : 'directory'}`
            }
            className="select-ring-main-container">
            <input ref={checkboxRef} type="checkbox" name={HTMLInputElementId} id={HTMLInputElementId} />
            <label htmlFor={HTMLInputElementId}></label>
            <i className="bi bi-check"></i>
        </div>
    );
}