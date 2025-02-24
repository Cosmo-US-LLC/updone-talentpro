import { useEffect, RefObject } from 'react';

type Handler = () => void;

function useClickOutside(ref: RefObject<HTMLElement>, handler: Handler) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, handler]);
}

export default useClickOutside;
