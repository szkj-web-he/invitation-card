/**
 * 大屏 一半 裁剪
 */
export const clipWhenHalf = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(width, height, 12, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(width, 12);
    ctx.arc(width, 0, 12, Math.PI / 2, Math.PI);
    ctx.lineTo(10, 0);
    ctx.arc(10, 10, 10, (Math.PI / 2) * 3, Math.PI, true);
    ctx.lineTo(0, height - 10);
    ctx.arc(10, height - 10, 10, Math.PI, Math.PI / 2, true);
    ctx.lineTo(width - 12, height);
    ctx.closePath();
    ctx.clip();
};

/**
 * 大屏 一半 画边框
 * @param ctx
 * @param width
 * @param height
 */
export const drawStrokeWhenHalf = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#EBEBEB";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width - 1, height - 1, 12, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(width - 1, 12);
    ctx.arc(width - 1, 1, 12, Math.PI / 2, Math.PI);
    ctx.lineTo(11, 1);
    ctx.arc(11, 11, 10, (Math.PI / 2) * 3, Math.PI, true);
    ctx.lineTo(1, height - 11);
    ctx.arc(11, height - 11, 10, Math.PI, Math.PI / 2, true);
    ctx.lineTo(width - 13, height - 1);
    ctx.closePath();
    ctx.stroke();
};

/**
 * 大屏 全屏 裁剪
 */
export const clipWhenFull = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(width - 10, height - 10, 10, 0, Math.PI / 2);
    ctx.lineTo(355 + 12, height);
    ctx.arc(355, height, 12, 0, Math.PI, true);
    ctx.lineTo(10, height);
    ctx.arc(10, height - 10, 10, Math.PI / 2, Math.PI);
    ctx.lineTo(0, 10);
    ctx.arc(10, 10, 10, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(355 - 12, 0);
    ctx.arc(355, 0, 12, Math.PI, 0, true);
    ctx.lineTo(width - 10, 0);
    ctx.arc(width - 10, 10, 10, (Math.PI / 2) * 3, Math.PI * 2);
    ctx.lineTo(width, height - 10);
    ctx.closePath();
    ctx.clip();
};

/**
 * 大屏 全部 画边框
 * @param ctx
 * @param width
 * @param height
 */
export const drawStrokeWhenFull = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#EBEBEB";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width - 11, height - 11, 10, 0, Math.PI / 2);
    ctx.lineTo(355 + 12 + 1, height - 1);
    ctx.arc(355, height - 1, 13, 0, Math.PI, true);
    ctx.lineTo(11, height - 1);
    ctx.arc(11, height - 10 - 1, 10, Math.PI / 2, Math.PI);
    ctx.lineTo(1, 11);
    ctx.arc(11, 11, 10, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(355 - 12 - 1, 0);
    ctx.arc(355, 1, 13, Math.PI, 0, true);
    ctx.lineTo(width - 11, 1);
    ctx.arc(width - 11, 11, 10, (Math.PI / 2) * 3, Math.PI * 2);
    ctx.lineTo(width - 1, height - 11);
    ctx.closePath();
    ctx.stroke();
};
