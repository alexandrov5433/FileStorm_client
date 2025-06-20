import './selectRing.sass';

import { useEffect, useRef, type RefObject } from 'react';
import type { SelectorManipulationObject } from '../../../../lib/definition/selectRing';
import { useEventListenerForRef } from '../../../../lib/hook/eventListener';

export default function SelectRing({
    inputElementId,
    fileOrDirId,
    addToCheckedList,
    removeFromCheckedList,
    selectAllInDirectory,
    unselectAllInDirectory,
    addSelectorManipulationObject,
    addMasterSelectorManipulationObject
}: {
    inputElementId: string,
    fileOrDirId?: number,
    addToCheckedList?: (id: number) => void,
    removeFromCheckedList?: (id: number) => void,
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
                fileOrDirId: fileOrDirId || 0,
                check: () => {
                    if (!checkboxRef.current) return;
                    checkboxRef.current!.checked = true;
                },
                uncheck: () => {
                    if (!checkboxRef.current) return;
                    checkboxRef.current!.checked = false;
                }
            });
        }, [checkboxRef.current]);
    }
    function checkAllListener(e: Event) {
        const isChecked = (e.target as HTMLInputElement)?.checked;
        isChecked ? selectAllInDirectory?.() : unselectAllInDirectory?.();
    }

    // for individual selectors
    if (addToCheckedList && removeFromCheckedList && addSelectorManipulationObject) {
        useEventListenerForRef(checkboxRef as RefObject<HTMLElement>, 'change', checkSingleListener);
        useEffect(() => {
            if (!checkboxRef.current) return;
            addSelectorManipulationObject?.({
                fileOrDirId: fileOrDirId || 0,
                check: () => {
                    const isChecked = checkboxRef.current!.checked;
                    if (isChecked == false) checkboxRef.current?.click();
                },
                uncheck: () => {
                    const isChecked = checkboxRef.current!.checked;
                    if (isChecked) checkboxRef.current?.click();
                }
            });
        }, [checkboxRef.current]);
    }
    function checkSingleListener(e: Event) {
        const isChecked = (e.target as HTMLInputElement)?.checked;
        isChecked ? addToCheckedList?.(Number(fileOrDirId) || 0) : removeFromCheckedList?.(Number(fileOrDirId) || 0);
    }

    return (
        <div className="select-ring-main-container">
            <input ref={checkboxRef} type="checkbox" name={inputElementId} id={inputElementId} />
            <label htmlFor={inputElementId}></label>
            <i className="bi bi-check"></i>
        </div>
    );
}