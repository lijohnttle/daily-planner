import { useRef, useEffect } from "react";

export const useDebouncer = () => {
    const timerId = useRef();

    useEffect(() => {
        timerId.current = null;

        return () => {
            clearTimeout(timerId.current);
        };
    }, []);

    return (action, timeoutMs) => {
        clearTimeout(timerId.current);

        timerId.current = setTimeout(() => {
            clearTimeout(timerId.current);
            timerId.current = null;
            action();
        }, timeoutMs);
    };
};