import { useEffect, useRef, type RefObject } from "react";

type ExtendedEventMap = DocumentEventMap & WindowEventMap & HTMLElementEventMap;

export function useEventListener<K extends keyof ExtendedEventMap>(
    element: HTMLElement | Window | Document,
    eventType: K,
    listener: (event: ExtendedEventMap[K]) => any | void
) {
    const eventListenerRef = useRef(listener);

    useEffect(() => {
        eventListenerRef.current = listener;
    }, [listener]);

    useEffect(() => {
        if (!element || !eventType) return;
        const _listener = (e: Event) => eventListenerRef.current(e as ExtendedEventMap[K]);
        element.addEventListener(eventType, _listener);
        return () => element.removeEventListener(eventType, _listener);
    }, [element, eventType]);
}

export function useEventListenerForRef<K extends keyof ExtendedEventMap>(
    ref: RefObject<HTMLElement | null>,
    eventType: K,
    listener: (event: ExtendedEventMap[K]) => any | void,
    extraHookTrigger?: any
) {
    const eventListenerRef = useRef(listener);

    useEffect(() => {
        eventListenerRef.current = listener;
    }, [listener]);

    useEffect(() => {
        if (!ref || !ref.current || !eventType) return;
        const _listener = (e: Event) => eventListenerRef.current(e as ExtendedEventMap[K]);
        ref.current.addEventListener(eventType, _listener);
        return () => {
            if (!ref || !ref.current) return;
            // when a DOM Element is deleted from the DOM, event listeners attached to it are also removed, as long as there are no references to that same element.
            ref.current?.removeEventListener(eventType, _listener)
        };
    }, [ref, ref.current, eventType, extraHookTrigger]);
}