import { comms } from "..";

/**
 * 画圆角矩形
 */
export const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    // 右下
    ctx.arc(width - 10, height - 10, 10, 0, Math.PI / 2);
    ctx.lineTo(10, height);
    // 左下
    ctx.arc(10, height - 10, 10, Math.PI / 2, Math.PI);
    ctx.lineTo(0, 10);
    // 左上
    ctx.arc(10, 10, 10, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(width - 10, 0);
    // 右上
    ctx.arc(width - 10, 10, 10, (Math.PI / 2) * 3, Math.PI * 2);
    ctx.lineTo(width, height - 10);
    ctx.closePath();
    ctx.fill();
    ctx.clip();
};

/**
 * 画分割线
 */
export const drawSplit = (ctx: CanvasRenderingContext2D, width: number): void => {
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#EBEBEB";
    ctx.beginPath();
    ctx.moveTo(width / 2, 45 + 160 + 12);
    ctx.lineTo(width / 2, 45 + 160 + 12 + 12);
    ctx.closePath();
    ctx.stroke();
};

/**
 * 插入姓名
 */
export const insertName = (
    ctx: CanvasRenderingContext2D,
    name: string,
    width: number,
    height: number,
): void => {
    ctx.globalAlpha = 1;
    ctx.font = "500 16px / 20px alipuhui";
    const arr = name.split("");
    ctx.fillStyle = "#4d4d4d";
    let right = width - 5;
    for (let i = arr.length - 1; i >= 0; i--) {
        const item = arr[i];
        const width = ctx.measureText(item).width;
        ctx.fillText(item, right - width, height + 16);
        right = right - width - 0.2;
    }
};

/**
 * 插入姓名
 */
export const insertBirth = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
): void => {
    ctx.globalAlpha = 1;
    ctx.font = "400 14px / 20px alipuhui";
    const arr = text.split("");
    ctx.fillStyle = "#4d4d4d";
    let left = x;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const width = ctx.measureText(item).width;
        ctx.fillText(item, left, y + 16);
        left = left + width + 0.2;
    }
};

/**
 * 插入描述
 */
export const insertDes = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    bottom: number,
): void => {
    ctx.globalAlpha = 1;
    ctx.font = "400 12px / 18px alipuhui";
    ctx.fillStyle = "#BDBDBD";
    const arr = comms.config.question ?? "";

    let sum = 0;
    const textData: Array<{
        left: number;
        value: string;
        top: number;
    }> = [];

    /**
     * 分割下标
     */
    let splitIndex = 0;

    /**
     * 初始位置
     */
    let left = 40;
    const top = height - bottom;
    let rowWidth = 0;
    ctx.textBaseline = "bottom";
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        const { width } = ctx.measureText(item);
        sum += 0.5 + width;
        left += i === 0 ? width : 0.5 + width;
        if (sum > 236) {
            for (let j = splitIndex; j < textData.length; j++) {
                textData[j].top -= 18;
            }
            splitIndex = i;
            sum = 0;
        }

        if (i === splitIndex) {
            rowWidth = width;
            left = 40;
        } else {
            rowWidth += width + 0.5;
        }
        textData.push({
            left,
            top,
            value: item,
        });

        if (i === arr.length - 1) {
            const offset = (236 - rowWidth) / 2;
            for (let j = splitIndex; j < textData.length; j++) {
                textData[j].left += offset;
            }
        }
    }

    for (let i = 0; i < textData.length; i++) {
        const item = textData[i];
        ctx.fillText(item.value, item.left, item.top);
    }
};

export const insertNameWhenSmall = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
): void => {
    const maxWidth = 163;
    ctx.globalAlpha = 1;

    ctx.font = "500 16px / 24px alipuhui";
    const arr = text.split("");
    ctx.fillStyle = "#4d4d4d";
    ctx.textBaseline = "top";
    let left = x;
    let top = y;
    let sumWidth = 0;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const width = ctx.measureText(item).width;

        if (i === 0) {
            sumWidth = width;
        } else {
            sumWidth += width + 0.2;
        }
        if (sumWidth > maxWidth) {
            top += 24;
            sumWidth = width;
            ctx.fillText(item, left, top);
            left = x;
        } else {
            ctx.fillText(item, left, top);
            left = left + width + 0.2;
        }
    }
};

export const insertBirthWhenSmall = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
): void => {
    ctx.globalAlpha = 1;

    ctx.font = "400 14px / 20px alipuhui";
    const arr = text.split("");
    ctx.fillStyle = "#4d4d4d";
    ctx.textBaseline = "bottom";
    let left = x;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const width = ctx.measureText(item).width;
        ctx.fillText(item, left, y);
        left = left + width + 0.2;
    }
};
