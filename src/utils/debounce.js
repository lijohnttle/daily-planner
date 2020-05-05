import { useRef, useEffect } from "react";

export const useDebouncer = (defaultAction, defaultDelay) => {
    const timerIdRef = useRef();
    const defaultActionRef = useRef(defaultAction);
    const defaultDelayRef = useRef(defaultDelay);

    useEffect(() => {
        timerIdRef.current = null;

        return () => {
            clearTimeout(timerIdRef.current);
        };
    }, []);

    return (action, timeoutMs) => {
        clearTimeout(timerIdRef.current);

        timerIdRef.current = setTimeout(() => {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
            (action ?? defaultActionRef.current)();
        }, timeoutMs ?? defaultDelayRef.current);
    };
};