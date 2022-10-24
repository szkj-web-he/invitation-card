import { comms } from "..";
import default from './../Components/Icon/Unit/customFontIcon';

/**
 * 画圆角矩形
 */
export const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
): void => {
    ctx.beginPath();
    ctx.arc(width - 10, height - 10, 10, 0, Math.PI / 2);
    ctx.lineTo(10, height);
    ctx.arc(10, height - 10, 10, Math.PI / 2, Math.PI);
    ctx.lineTo(0, 10);
    ctx.arc(10, 10, 10, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(width - 10, 0);
    ctx.arc(width - 10, 10, 10, (Math.PI / 2) * 3, Math.PI * 2);
    ctx.lineTo(width, height - 10);
    ctx.closePath();
    ctx.clip();
};

/**
 * 画分割线
 */
export const drawSplit = (ctx: CanvasRenderingContext2D, width: number): void => {
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
export const insertDes = (ctx: CanvasRenderingContext2D, width:number, height: number): void => {
    ctx.font = "400 12px / 18px alipuhui";
    ctx.fillStyle = "#BDBDBD";
    const arr = comms.config.question ?? "";

    let sum = 0;
    const textData:Array<{
        default:number,
        value:string,
        offset:number,
        top:number
    }> = [];

    /**
     * 分割下标
     */
    let splitIndex = 0;

    /**
     * 初始位置
     */
    let left = 40;
    let top = height - 17- 18;
    let rowWidth = 0;
    for(let i = 0;i<arr.length;i++){
        const item = arr[i];
textData.push({
    default:left,
    top,
    value:item,
    offset:0
})

         const width = ctx.measureText(item).width;
         sum += width+0.5;
        left += width+0.5;
// rowWidth
         if(sum>236){
            for(let j = splitIndex;j<textData.length;j++){
                textData[j].top -= 18; 
            }
            top += 18;
            splitIndex = i-1;

         }else{

         }
    };

    ctx.fillText(comms.config.question ?? "", 48, height - 40, 236);
};
