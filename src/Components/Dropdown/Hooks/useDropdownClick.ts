/**
 * @file dropdown的 globalClick
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDropdownContext } from "../Dropdown";
import { TriggerProps } from "../Unit/type";

export const useDropdownClick = (
    visible: boolean,
    callback: () => void,
    eventId?: string,
    eventName?: TriggerProps | TriggerProps[],
    disable?: boolean,
): React.MutableRefObject<number | null> => {
    const { btnIsClick } = useDropdownContext();

    const [isMobile, setIsMobile] = useState(window.matchMedia("(any-pointer:coarse)").matches);

    const timer = useRef<number | null>(null);

    const disableRef = useRef(disable);

    const destroy = useRef(false);

    const callbackRef = useRef(callback);

    const visibleRef = useRef(visible);

    /**
     * 是否可以添加全局点击事件
     */
    const isClick = useMemo(() => {
        let status = false;
        for (const key in btnIsClick) {
            const data = btnIsClick[key];
            if (data.clickId === eventId) {
                status =
                    !data.disable &&
                    !!(data.trigger === "click" || data.trigger?.includes("click"));
            } else if (data.contextmenuId === eventId) {
                status =
                    !data.disable &&
                    !!(data.trigger === "contextmenu" || data.trigger?.includes("contextmenu"));
            }
        }
        return status;
    }, [btnIsClick, eventId]);

    useLayoutEffect(() => {
        disableRef.current = disable;
    }, [disable]);

    useLayoutEffect(() => {
        visibleRef.current = visible;
    }, [visible]);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    /**
     * 是否是手机端
     */
    useLayoutEffect(() => {
        const fn = () => {
            setIsMobile(window.matchMedia("(any-pointer:coarse)").matches);
        };
        if (isClick) {
            window.addEventListener("resize", fn);
        }
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, [isClick]);

    useEffect(() => {
        destroy.current = false;
        return () => {
            destroy.current = true;
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);

    /**
     *
     */
    useLayoutEffect(() => {
        const clickFn = () => {
            timer.current = window.setTimeout(() => {
                if (destroy.current) {
                    return;
                }
                callbackRef.current();
            });
        };

        if (
            eventName === "click" ||
            eventName?.includes("click") ||
            eventName === "contextmenu" ||
            eventName?.includes("contextmenu") ||
            isClick
        ) {
            document.addEventListener("click", clickFn, true);
            document.addEventListener("contextmenu", clickFn, true);
        }
        return () => {
            document.removeEventListener("click", clickFn, true);
            document.addEventListener("contextmenu", clickFn, true);
        };
    }, [isClick, isMobile, eventId, eventName]);

    return timer;
};
