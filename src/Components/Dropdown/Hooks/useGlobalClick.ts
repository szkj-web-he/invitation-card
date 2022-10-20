/**
 * @file
 * @date 2022-09-09
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-09
 */
import React, { useEffect, useInsertionEffect, useRef } from "react";
import { useMobile } from "../../Scroll/Unit/useMobile";
import { findReactElementFromDoms, includeElsProps } from "../Kite/Unit/findDomNode";
import { GlobalClick } from "../Kite/Unit/type";

/**
 *
 * @param {GlobalClick | undefined} callback 全局点击的回调函数
 * @param {Element | undefined} root 根节点
 * @param {HTMLDivElement | null} portal portal节点
 */
export const useGlobalClick = (
    callback: GlobalClick | undefined,
    root: Element | undefined,
    portal: React.MutableRefObject<HTMLDivElement | null>,
): void => {
    const callbackFn = useRef(callback);
    const rootEl = useRef(root);
    const isMobile = useMobile();

    useInsertionEffect(() => {
        callbackFn.current = callback;
    }, [callback]);

    useInsertionEffect(() => {
        rootEl.current = root;
    }, [root]);

    useEffect(() => {
        const findDomFn = (e: MouseEvent | TouchEvent) => {
            let el = e.target;

            const elements: Element[] = [];

            while (
                el instanceof Element &&
                typeof el.tagName === "string" &&
                !["BODY", "HTML"].includes(el.tagName)
            ) {
                elements.push(el);
                el = el.parentElement;
            }

            const arr: includeElsProps[] = [];

            rootEl.current &&
                arr.push({
                    name: "isBtn",
                    el: rootEl.current,
                });
            portal.current && arr.push({ name: "isMenu", el: portal.current });

            /**
             * 这里记录了状态
             */
            const status = findReactElementFromDoms(elements, [...arr]);
            const data: Record<string, boolean> = {
                isBtn: false,
                isMenu: false,
            };
            for (let i = 0; i < status.length; i++) {
                data[status[i].name] = status[i].status;
            }
            return data;
        };

        const mouseFn = (e: MouseEvent) => {
            if (!callbackFn.current) {
                return;
            }
            const data = findDomFn(e);
            document.addEventListener(
                "mouseup",
                () => {
                    callbackFn.current?.({ ...data } as { isBtn: boolean; isMenu: boolean });
                },
                {
                    once: true,
                },
            );
        };

        const touchFn = (e: TouchEvent) => {
            if (!callbackFn.current) {
                return;
            }
            const data = findDomFn(e);
            document.addEventListener(
                "touchend",
                () => {
                    callbackFn.current?.({ ...data } as { isBtn: boolean; isMenu: boolean });
                },
                {
                    once: true,
                },
            );
        };

        if (isMobile) {
            document.addEventListener("touchstart", touchFn, true);
        } else {
            document.addEventListener("mousedown", mouseFn, true);
        }

        return () => {
            document.removeEventListener("mousedown", mouseFn, true);
            document.removeEventListener("touchstart", touchFn, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);
};
