/**
 * @file dropdown的type
 * @date 2022-09-29
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-29
 */

/**
 * 触发的展开或者关闭的事件类型
 */
export type TriggerProps = "hover" | "focus" | "click" | "contextmenu";

/**
 *
 * l => left
 * r => right
 * c => center
 * t => top
 * b => bottom
 */
export type Placement = "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";

export interface TriangleProps {
    width: string;
    height: string;
    color?: string;
    offset?: OffsetProps;
}

export interface OffsetProps {
    x?: number | ((val: number, width: { triangle: number; root: number; kite: number }) => number);
    y?:
        | number
        | ((val: number, height: { triangle: number; root: number; kite: number }) => number);
}

interface MousedownEvent {
    event: "mousedown";
    id: string;
}

interface CustomChangeShowEvent {
    event: "changeShow";
    id: string;
}

interface MouseEvent {
    event: "click" | "mouseenter" | "mouseleave" | "focus" | "blur" | "contextmenu";
    id: string;
    eventId: string;
}

export type CustomEventAction = MousedownEvent | MouseEvent | CustomChangeShowEvent;
