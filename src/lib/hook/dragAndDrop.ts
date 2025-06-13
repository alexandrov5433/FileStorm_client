import { useEffect } from "react";

export default function dragAndDropListenerHook(
    element: HTMLDivElement,
    dragoverStylingToggler: (arg: boolean) => void,
    onDropInsertIntoInput: (files: FileList) => void
) {
    useEffect(() => {
        if (!element) return;
        console.log('drag and drop listeners added.');
        
        element.addEventListener('drop', dropListener);
        element.addEventListener('dragover', dragoverListener);
        element.addEventListener('dragleave', dragleaveListener);
        return () => {
            element.removeEventListener('drop', dropListener);
            element.removeEventListener('dragover', dragoverListener);
            element.removeEventListener('dragleave', dragleaveListener);
        }
    }, [element]);
    function dropListener(e: DragEvent) {
        e.preventDefault();
        dragoverStylingToggler(false);
        const fileList = e.dataTransfer?.files;
        if (!fileList) return;
        onDropInsertIntoInput(fileList);
    }
    function dragoverListener(e: DragEvent) {
        e.preventDefault();
        dragoverStylingToggler(true);
    }
    function dragleaveListener(e: DragEvent) {
        e.preventDefault();
        dragoverStylingToggler(false);
    }
};