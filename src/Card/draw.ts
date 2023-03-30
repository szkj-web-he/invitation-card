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

interface TextPointProps {
    /**
     * 文字
     */
    value: string;
    /**
     * x轴
     */
    left: number;
    /**
     * 第几行
     */
    row: number;
    /**
     * 文字style
     */
    font: string;
    /**
     * 文字颜色
     */
    color: string;
    /**
     * 文字宽度
     */
    width: number;
    /**
     * 右坐标
     */
    right: number;
    /**
     * 行高
     */
    lineHeight: number;
}

/**
 * 获取文字的某些样式
 */
const getStyleData = (el: Element) => {
    const styleData = window.getComputedStyle(el, null);

    const lineHeight = styleData.lineHeight;

    return {
        font: `${styleData.fontWeight} ${styleData.fontSize} / ${lineHeight} ${styleData.fontFamily}`,
        color: styleData.color,
        lineHeight: Number(lineHeight.replace(/[^0-9.]/g, "")),
    };
};

const mapFont = (
    texts: string,
    fontStyle: ReturnType<typeof getStyleData>,
    container: Array<TextPointProps>,
    ctx: CanvasRenderingContext2D,
    lineHeights: Array<number>,
    rowNum: { current: number },
    width: number,
    margin: number,
) => {
    /**
     * 最大宽度
     */
    const startLeft = margin;
    const maxRight = width - margin;
    /**
     * 文字间隔为0.5px
     */
    const letterSpace = 0.5;

    let maxHeight = lineHeights[rowNum.current] ?? 0;

    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];

        const lastFont = container.length ? container[container.length - 1] : null;
        let left = lastFont ? lastFont.right + letterSpace : startLeft;
        ctx.font = fontStyle.font;
        const width = Math.round(ctx.measureText(text).width * 100) / 100;
        if (left + width > maxRight) {
            /**
             * 赋值
             */
            lineHeights[rowNum.current] = maxHeight;

            /**
             * 重置
             */
            left = startLeft;
            ++rowNum.current;
            maxHeight = fontStyle.lineHeight;
        } else {
            maxHeight = maxHeight >= fontStyle.lineHeight ? maxHeight : fontStyle.lineHeight;
        }

        const right = left + width;

        container.push({
            value: text,
            left,
            row: rowNum.current,
            width,
            right,
            ...fontStyle,
        });

        if (i === texts.length - 1) {
            /**
             * 如果是最后一条
             * 赋值
             */
            lineHeights[rowNum.current] = maxHeight;
        }
    }
};

/**
 * 设置文字的点位信息
 */
const setFontPoints = (
    el: Element,
    container: Array<TextPointProps>,
    ctx: CanvasRenderingContext2D,
    lineHeights: Array<number>,
    rowNum: { current: number },
    width: number,
    margin: number,
) => {
    const childList = el.childNodes;

    for (let i = 0; i < childList.length; i++) {
        const item = childList[i];
        if (item instanceof Text && item.textContent) {
            const fontStyle = getStyleData(el);
            mapFont(
                item.textContent,
                fontStyle,
                container,
                ctx,
                lineHeights,
                rowNum,
                width,
                margin,
            );
        } else if (item instanceof Element) {
            setFontPoints(item, container, ctx, lineHeights, rowNum, width, margin);
        }
    }
};

export const insertDes = (ctx: CanvasRenderingContext2D, bottom: number, el: HTMLElement): void => {
    const { width, height } = ctx.canvas;
    //
    /**
     * 文字坐标
     */
    const fontPoints: Array<TextPointProps> = [];

    /**
     * 每行的最大高度
     */
    const lineHeight: Array<number> = [];

    /**
     * 第几行
     */
    const rowNum = { current: 0 };

    /**
     * 文字两边边距
     */
    const margin = 40;
    setFontPoints(el, fontPoints, ctx, lineHeight, rowNum, width, margin);

    /**
     * 最大宽度
     */

    /**
     * 最后一行的下标
     * 如果是最后一行需要知道
     * 它这一行的总宽度
     * 并居中
     */
    /**
     * 最后一行的下标
     */
    const lastIndex = lineHeight.length - 1;

    const endRight = fontPoints[fontPoints.length - 1].right;

    /**
     * 最后一行的左偏移值
     */

    const marginLeft = (width - (endRight - margin)) / 2;
    /**
     * end
     */

    /**
     * 设置每一行的高度
     */
    let startBottom = height - bottom;
    /**
     * 每行的点位
     */
    const lineHeightPoints: Array<{ value: number; top: number }> = [];

    for (let i = lineHeight.length - 1; i >= 0; i--) {
        const item = lineHeight[i];

        lineHeightPoints.unshift({
            top: startBottom - item,
            value: item,
        });
        /**
         * 5为行间距
         */
        startBottom -= item - 5;
    }

    ctx.globalAlpha = 1;
    for (let i = 0; i < fontPoints.length; i++) {
        const fontItem = fontPoints[i];
        ctx.font = fontItem.font;
        ctx.fillStyle = fontItem.color;

        /**
         * 获取top值
         */
        const lineHeightData = lineHeightPoints[fontItem.row];
        const marginTop = lineHeightData.value - fontItem.lineHeight;
        const top = lineHeightData.top + marginTop;

        /**
         * 获取left值
         */
        let left = fontItem.left;
        if (lastIndex === fontItem.row) {
            left = marginLeft + (fontItem.left - margin);
        }
        ctx.fillText(fontItem.value, left, top);
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
    ctx.lineTo(13, height - 1);
    // 左下
    ctx.moveTo(13, height);
    ctx.arc(0, height, 13, 0, (Math.PI / 2) * 3, true);
    ctx.moveTo(1, 13);

    // 左上
    ctx.arc(0, 0, 13, Math.PI / 2, 0, true);
    ctx.moveTo(13, 1);
    ctx.lineTo(width - 11, 1);

    // 右上
    ctx.arc(width - 11, 11, 10, (Math.PI / 2) * 3, Math.PI * 2);
    ctx.lineTo(width - 1, height - 11);
    ctx.stroke();

    ctx.strokeStyle = "#BDBDBD";
    ctx.lineWidth = 1;
    ctx.beginPath();
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
