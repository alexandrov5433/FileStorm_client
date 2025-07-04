import { useEffect } from "react";

/**
 * Creates an event listener on keydown for the Enter key and triggers a click on the given element when the Enter key is hit.
 * @param element The HTMLElement on which to trigger the click.
 */
export function useEnterKeyBind(element: HTMLElement) {
    useEffect(() => {
        if (!element) return;
        const keyStrokeListener = (e: KeyboardEvent) => {
            if (e.key == 'Enter') {
                element.click();
            }
        }
        document.addEventListener('keydown', keyStrokeListener);
        return () => {
            document.removeEventListener('keydown', keyStrokeListener);
        };
    }, [element]);
}

/**
 * Creates an event listener on keydown for the Escape key and triggers a click on the given element when the Escape key is hit.
 * @param element The HTMLElement on which to trigger the click.
 */
export function useEscapeKeyBind(element: HTMLElement) {
    useEffect(() => {
        if (!element) return;
        const keyStrokeListener = (e: KeyboardEvent) => {
            //In Firefox 36 and earlier, the Esc key returns "Esc" instead of "Escape".
            if (['Esc', 'Escape'].includes(e.key)) {
                element.click();
            }
        }
        document.addEventListener('keydown', keyStrokeListener);
        return () => {
            document.removeEventListener('keydown', keyStrokeListener);
        };
    }, [element]);
}