import { useMemo } from "react";

export const useId = (prefix?: string): string => {
    return useMemo(() => {
        const blob = new Blob();
        const url = URL.createObjectURL(blob);

        const linkArr = url.split("/");

        URL.revokeObjectURL(url);
        return `${prefix ? prefix : ""}${linkArr[linkArr.length - 1]}${Date.now().toString(36)}`;
    }, [prefix]);
};
