import { useState, useCallback } from 'react';

export function useFlip(initialState = false) {
    const [isFlipped, setIsFlipped] = useState(initialState);

    const toggle = useCallback(() => {
        setIsFlipped(prev => !prev);
    }, []);

    return { isFlipped, toggle };
}
