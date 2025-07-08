import { useState } from 'react';

export function useRerender() {
    const [key, setKey] = useState(0);
    const rerender = () => {
        setKey(prev => prev + 1);
    };

    return { key, rerender };
}
