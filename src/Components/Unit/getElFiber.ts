/**
 * @file get element Fiber
 * @date 2021-12-31
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-31
 */

import { Fiber, fiberKey } from "../Dropdown/Kite/Unit/findDomNode";

/**
 *
 * @param {Element} el
 * @returns {Fiber|null}
 */
export const getElFiber = (el: Element): Fiber | null => {
    const keys = Object.keys(el);
    let key = "";
    for (let i = 0; i < keys.length; ) {
        const item = keys[i];
        if (item.includes(fiberKey)) {
            i = keys.length;
            key = item;
        } else {
            ++i;
        }
    }
    return key ? ((el as unknown as Record<string, unknown>)[key] as Fiber) : null;
};

export const findFiber = (el: HTMLElement, keys: string[]): boolean => {
    let fiber = getElFiber(el);
    let status = false;

    while (!status && fiber) {
        if (fiber.key && keys.includes(fiber.key)) {
            status = true;
        } else {
            fiber = fiber.return;
        }
    }

    return status;
};
