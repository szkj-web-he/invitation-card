/**
 * @file
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useId } from "../../../Hooks/useId";
import { useGlobalClick } from "../Hooks/useGlobalClick";
import Root from "./Unit/kiteRoot";
import Portal from "./Unit/position";
import { GlobalClick, MainProps } from "./Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface KiteProps extends MainProps {
    /**
     * The kite will fly around root
     */
    root: React.ReactElement | Element;
    /**
     * show of 'Kite
     */
    show?: boolean;
    /**
     * Callback function for global click
     *
     * isBtn => click on root element
     * isMenu => click on kite child element
     */
    handleGlobalClick?: GlobalClick;
    /**
     * Remove when the element is hidden
     */
    removeOnHidden?: boolean;
    /**
     * Cache only works if removeOnHidden=true.
     * When cache=true, as long as the element has been rendered, it will no longer be removed.  The opposite is the state of cache=false.
     */
    cache?: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Kite = forwardRef<HTMLDivElement, KiteProps>(
    (
        {
            root,
            children,
            show = false,
            handleGlobalClick,
            placement = "cb",
            direction = "vertical",
            removeOnHidden = true,
            cache = true,
            offset,
            handlePositionChange,
            handleTransitionEnd,
            handleTransitionStart,
            handleTransitionCancel,
            animate,
            triangle,
            ...props
        },
        ref,
    ) => {
        Kite.displayName = "Kite";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const id = useId();

        const count = useRef(0);

        const oldShow = useRef<boolean>();

        const [, setTransitionEnd] = useState(true);

        const [rootEl, setRootEl] = useState<Element>();

        const portalRef = useRef<HTMLDivElement | null>(null);
        /**
         * 这个是开始是show变化了就会直接执行
         * 不是css导致的触发
         */
        const transitionEnd = useRef(true);

        const [ready, setReady] = useState(false);

        const positionChangeFn = useRef(handlePositionChange);

        useGlobalClick(handleGlobalClick, rootEl, portalRef);

        const [visible, setVisible] = useState<boolean>();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /**
         * 将动态监听的数据
         * 转化为静态的
         * start
         */

        useLayoutEffect(() => {
            positionChangeFn.current = handlePositionChange;
        }, [handlePositionChange]);
        /**
         * 将动态监听的数据
         * 转化为静态的
         * end
         */

        useEffect(() => {
            if (ready) {
                setVisible(show);
            }
        }, [show, ready]);

        if (show !== oldShow.current) {
            if (show) {
                ++count.current;
            }
            transitionEnd.current = false;
            setTransitionEnd(false);
            oldShow.current = show;
        }

        const isRemove = () => {
            if (removeOnHidden) {
                if (cache) {
                    if (!show && !count.current && transitionEnd.current) {
                        //  isRemove = true;
                        return true;
                        // content = <></>;
                    }
                } else if (!show && transitionEnd.current) {
                    //  isRemove = true;
                    return true;
                    // content = <></>;
                }
            }
            return false;
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <>
                <Root
                    id={id}
                    getRootEl={(el: Element | undefined) => {
                        setRootEl(el);
                        setReady(!!el);
                    }}
                >
                    {root}
                </Root>

                <Portal
                    isRemove={isRemove()}
                    direction={direction}
                    placement={placement}
                    show={visible}
                    root={rootEl}
                    hashId={id}
                    ref={(el) => {
                        portalRef.current = el;

                        if (typeof ref === "function") {
                            ref(el);
                        } else if (ref !== null) {
                            (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                        }
                    }}
                    handleTransitionStart={handleTransitionStart}
                    portalOffset={offset}
                    triangleOffset={triangle}
                    handleTransitionEnd={() => {
                        handleTransitionEnd?.();
                        setTransitionEnd(true);
                        transitionEnd.current = true;
                    }}
                    handleTransitionCancel={() => {
                        handleTransitionCancel?.();
                        setTransitionEnd(true);
                        transitionEnd.current = true;
                    }}
                    animation={animate}
                    {...props}
                >
                    {children}
                </Portal>
            </>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Kite.displayName = "Kite";
