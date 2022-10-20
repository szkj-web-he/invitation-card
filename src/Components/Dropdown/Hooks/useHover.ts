/**
 * @file dropdown的hover或focus的事件
 * @date 2022-10-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-07
 */

import { useLayoutEffect, useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export enum ActionType {
    UpdateBtnAction = "UPDATEBTN",
    UpdateContentAction = "UPDATECONTENT",
}

type UpdateBtnAction = {
    type: ActionType.UpdateBtnAction;
    payload: boolean;
};

type UpdateContentAction = {
    type: ActionType.UpdateContentAction;
    payload: boolean;
};

type HoverAction = UpdateBtnAction | UpdateContentAction;

export interface ObjectDOMRect {
    readonly height: number;
    readonly width: number;
}

export const useHover = (
    delayOnShow = 150,
    delayOnHide = 150,
): ((action: HoverAction) => Promise<boolean>) => {
    /**
     * btn的状态
     * 是否被hover、focus
     */
    const btnStatus = useRef(false);
    /**
     * 下拉内容的状态
     * 是否被hover、focus
     */
    const contentStatus = useRef(false);

    const delayOnShowRef = useRef(delayOnShow);
    const delayOnHideRef = useRef(delayOnHide);

    const timer = useRef<number>();

    useLayoutEffect(() => {
        delayOnShowRef.current = delayOnShow;
    }, [delayOnShow]);

    useLayoutEffect(() => {
        delayOnHideRef.current = delayOnHide;
    }, [delayOnHide]);

    useEffect(() => {
        return () => {
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);

    return useCallback((action: HoverAction) => {
        const switchStatus = () => {
            return new Promise<boolean>((resolve) => {
                timer.current =
                    btnStatus.current || contentStatus.current
                        ? window.setTimeout(() => {
                              resolve(true);
                          }, delayOnShowRef.current)
                        : window.setTimeout(() => {
                              resolve(false);
                          }, delayOnHideRef.current);
            });
        };

        switch (action.type) {
            case ActionType.UpdateBtnAction:
                btnStatus.current = action.payload;
                break;
            case ActionType.UpdateContentAction:
                contentStatus.current = action.payload;
                break;
        }
        return switchStatus();
    }, []);
};
