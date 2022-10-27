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
    ctx.lineTo(12, height);
    // 左下
    ctx.arc(0, height, 12, 0, (Math.PI / 2) * 3, true);
    ctx.lineTo(0, 12);
    // 左上
    ctx.arc(0, 0, 12, Math.PI / 2, 0, true);
    ctx.lineTo(width - 10, 0);
    // 右上
    ctx.arc(width - 10, 10, 10, (Math.PI / 2) * 3, Math.PI * 2);
    ctx.lineTo(width, height - 10);
    ctx.closePath();
    ctx.fill();
    ctx.clip();
};

/**
 * 插入姓名
 *
 * @result {number} top 最后一个字符的bottom值
 */
export const insertName = (
    ctx: CanvasRenderingContext2D,
    name: string,
    x: number,
    y: number,
): number => {
    ctx.globalAlpha = 1;
    ctx.font = "500 16px / 24px alipuhui";
    const arr = name.split("");
    ctx.fillStyle = "#4d4d4d";
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
    let left = x;
    let top = y;
    const maxWidth = 332 - 40;
    const letterSpace = 0.2;
    let rowWidth = 0;
    ctx.textBaseline = "top";
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        const { width } = ctx.measureText(item);
        sum += letterSpace + width;
        if (sum > maxWidth) {
            top += 24;
            splitIndex = i;
            sum = 0;
        }

        if (i === splitIndex) {
            rowWidth = width;
            textData.push({
                left: x,
                top,
                value: item,
            });
            left = x;
        } else {
            rowWidth += width + letterSpace;
            textData.push({
                left,
                top,
                value: item,
            });
        }
        left += letterSpace + width;

        if (i === arr.length - 1) {
            const offset = (maxWidth - rowWidth) / 2;
            for (let j = splitIndex; j < textData.length; j++) {
                textData[j].left += offset;
            }
        }
    }

    for (let i = 0; i < textData.length; i++) {
        const item = textData[i];
        ctx.fillText(item.value, item.left, item.top);
    }
    return top + 24;
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
    ctx.textBaseline = "top";
    ctx.fillStyle = "#4d4d4d";
    let left = x;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const width = ctx.measureText(item).width;
        ctx.fillText(item, left, y);
        left = left + width + 0.2;
    }
};

/**
 * 插入描述
 */
export const insertDes = (ctx: CanvasRenderingContext2D, height: number, bottom: number): void => {
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
            const offset = (236 - (sum - 0.5 - width)) / 2;
            for (let j = 0; j < textData.length; j++) {
                textData[j].top -= 18;
            }

            for (let j = splitIndex; j < textData.length; j++) {
                textData[j].left += offset;
            }
            splitIndex = i;
            sum = width;
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
            ctx.fillText(item, x, top);
            left = x;
        } else {
            ctx.fillText(item, left, top);
        }
        left += width + 0.2;
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

export const drawRoundRectStroke = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#EBEBEB";
    ctx.beginPath();

    // 右下
    ctx.arc(width - 11, height - 11, 10, 0, Math.PI / 2);
    // if (isSmall) {
    //     ctx.lineTo(11, height - 1);
    // } else {
    ctx.lineTo(13, height - 1);
    // }
    // 左下
    // if (isSmall) {
    //     ctx.arc(11, height - 11, 10, Math.PI / 2, Math.PI);
    //     ctx.lineTo(1, 13);
    // } else {
    ctx.moveTo(13, height);
    ctx.arc(0, height, 13, 0, (Math.PI / 2) * 3, true);
    ctx.moveTo(1, 13);
    // }
    // 左上
    ctx.arc(0, 0, 13, Math.PI / 2, 0, true);
    ctx.moveTo(13, 1);
    // if (isSmall) {
    //     ctx.moveTo(width - 13, 1);
    // } else {
    ctx.lineTo(width - 11, 1);
    // }
    // 右上
    // if (isSmall) {
    //     ctx.arc(width, 0, 13, Math.PI, Math.PI / 2, true);
    //     ctx.moveTo(width - 1, 13);
    // } else {
    ctx.arc(width - 11, 11, 10, (Math.PI / 2) * 3, Math.PI * 2);
    // }
    ctx.lineTo(width - 1, height - 11);
    ctx.stroke();

    ctx.strokeStyle = "#BDBDBD";
    ctx.lineWidth = 1;
    ctx.beginPath();
    // if (isSmall) {
    //     ctx.setLineDash([5, 4]);
    //     ctx.moveTo(34, 0);
    //     ctx.lineTo(width - 34, 0);
    //     ctx.stroke();
    //     return;
    // }
    // 虚线

    ctx.setLineDash([5, 4]);
    ctx.moveTo(0, 32);
    ctx.lineTo(0, height - 32);
    ctx.stroke();
};

//这里
export const drawRoundRectWhenSmall = (
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
    ctx.lineTo(0, 12);

    // 左上
    ctx.arc(0, 0, 12, Math.PI / 2, 0, true);
    ctx.lineTo(width - 12, 0);

    // 右上
    ctx.arc(width, 0, 12, Math.PI, Math.PI / 2, true);
    ctx.lineTo(width, height - 10);
    ctx.closePath();
    ctx.fill();
    ctx.clip();
};

export const drawRoundRectStrokeWhenSmall = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#EBEBEB";
    ctx.beginPath();

    // 右下
    ctx.arc(width - 11, height - 11, 10, 0, Math.PI / 2);
    ctx.lineTo(11, height - 1);

    // 左下
    ctx.arc(11, height - 11, 10, Math.PI / 2, Math.PI);
    ctx.lineTo(1, 13);

    // 左上
    ctx.moveTo(0, 13);
    ctx.arc(0, 0, 13, Math.PI / 2, 0, true);
    ctx.moveTo(width - 13, 0);

    // 右上
    ctx.arc(width, 0, 13, Math.PI, Math.PI / 2, true);
    ctx.moveTo(width - 1, 13);
    ctx.lineTo(width - 1, height - 11);
    ctx.stroke();

    // 虚线
    ctx.strokeStyle = "#BDBDBD";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.setLineDash([5, 4]);
    ctx.moveTo(34, 0);
    ctx.lineTo(width - 34, 0);
    ctx.stroke();
};
