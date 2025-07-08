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

/**
 * Creates an event listener on keydown for the Ctrl + secondKey combination and triggers an action (click or focus) on the given element when the Ctrl + secondKey is hit.
 * @param element The HTMLElement on which to trigger the action.
 * @param secondKey The key with which the combination is triggered.
 * @param action The action to trigger.
 */
export function useControllComboKeyBind(element: HTMLElement, secondKey: string, action: 'click' | 'focus') {
    useEffect(() => {
        if (!element) return;
        const keyStrokeListener = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === secondKey) {
                console.log(e.ctrlKey, e.key, element);

                e.preventDefault();
                switch (action) {
                    case "click":
                        element?.click();
                        break;
                    case "focus":
                        element?.focus();
                        break;
                }
            }
        }
        document.addEventListener('keydown', keyStrokeListener);
        return () => {
            document.removeEventListener('keydown', keyStrokeListener);
        };
    }, [element]);
}