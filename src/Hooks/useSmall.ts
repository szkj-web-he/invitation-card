import { useEffect, useState } from "react";

const isSmall = () => {
    return window.matchMedia("(max-width: 720px)").matches;
};

export const useSmall = (): boolean => {
    const [state, setState] = useState(isSmall());

    useEffect(() => {
        const fn = () => {
            setState(isSmall());
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);
    return state;
};
