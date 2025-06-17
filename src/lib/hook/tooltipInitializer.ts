import { useEffect } from "react";
// @ts-ignore
import Tooltip from 'bootstrap/js/dist/tooltip';

/**
 * Initializes all toolpip elements and disposes of them when the component unmounts.
 * @param querySelectorAllArg The string used as argument of document.querySelectorAll to select all tooltip elements. Default value: '[data-bs-toggle="tooltip"]'
 */
export default function tooltipInitializer(
    querySelectorAllArg: string = '[data-bs-toggle="tooltip"]' 
) {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll(querySelectorAllArg)
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
        return () => {
            tooltipList.map(t => t.dispose());
        }
    }, []);
}