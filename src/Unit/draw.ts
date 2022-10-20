export const drawHalf = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
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
    ctx.stroke();
};
