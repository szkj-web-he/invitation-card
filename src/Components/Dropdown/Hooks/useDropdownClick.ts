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

    useLayoutEffect(() => {
        const mouseupFn = () => {
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                if (disableRef.current) {
                    return;
                }

                if (!visibleRef.current) {
                    return;
                }

                document.addEventListener(
                    "mouseup",
                    () => {
                        if (destroy.current) {
                            return;
                        }
                        callbackRef.current();
                    },
                    {
                        once: true,
                        capture: true,
                    },
                );
            });
        };

        const touchStartFn = () => {
            //移动端的点击事件有300ms的延时
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                if (disableRef.current) {
                    return;
                }

                if (!visibleRef.current) {
                    return;
                }

                document.addEventListener(
                    "touchend",
                    () => {
                        if (destroy.current) {
                            return;
                        }
                        callbackRef.current();
                    },
                    {
                        once: true,
                        capture: true,
                    },
                );
            }, 350);
        };

        if (
            eventName === "click" ||
            eventName?.includes("click") ||
            eventName === "contextmenu" ||
            eventName?.includes("contextmenu") ||
            isClick
        ) {
            if (isMobile) {
                document.addEventListener("touchstart", touchStartFn, true);
            } else {
                document.addEventListener("mousedown", mouseupFn, true);
            }
        }
        return () => {
            document.removeEventListener("mousedown", mouseupFn, true);
            document.addEventListener("touchstart", touchStartFn, true);
        };
    }, [isClick, isMobile, eventId, eventName]);

    return timer;
};
