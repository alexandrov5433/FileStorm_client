import { useEffect } from "react";

/**
 * Adds an event listener for the "mouseout" event to the given element and adds and removes the given className from the element's classList.
 * @param element The element to which to attach the event listerner add add/remove the given class. 
 * @param className The className which must be added and removed.
 * @param time The time in seconds for which the className must stay on the element. The className will be removed after this time duration is up.
 */
export default function mouseOutClassUpdate(element: HTMLElement, className: string, time: number) {
    useEffect(() => {
        if (!element) return;
        const listener = function (e: MouseEvent) {
            element.classList.add(className);
            setTimeout(() => element.classList.remove(className), time * 1000);
        }
        element.addEventListener('mouseout', listener);
        return () => element.removeEventListener('mouseout', listener);
    }, [element, className, time]);
}