import { useState, useEffect } from 'react';

export const useBreakpoints = () => {
    const [state, setState] = useState({
        sm: false,
        md: false,
        lg: false,
        width: typeof window !== 'undefined' ? window.innerWidth : 0
    });

    useEffect(() => {
        const mediaQueryLists = {
            sm: window.matchMedia('(min-width: 640px)'),
            md: window.matchMedia('(min-width: 768px)'),
            lg: window.matchMedia('(min-width: 1024px)')
        };

        const getValues = () => ({
            sm: mediaQueryLists.sm.matches,
            md: mediaQueryLists.md.matches,
            lg: mediaQueryLists.lg.matches,
            width: window.innerWidth
        });

        const handleResize = () => {
            setState(getValues());
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        Object.values(mediaQueryLists).forEach(mql => {
            mql.addEventListener('change', handleResize);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            Object.values(mediaQueryLists).forEach(mql => {
                mql.removeEventListener('change', handleResize);
            });
        };
    }, []);

    return state;
};
