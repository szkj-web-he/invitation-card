/**
 * 将内容转码  转化为ascii码
 */
import { comms } from "..";
export const encode = (
    lastName?: string,
    firName?: string,
    gender?: "X" | "Y",
    year?: number,
    month?: number,
): string => {
    return `${lastName ?? ""}&${firName ?? ""}&${gender ?? ""}&${year ?? ""}&${month ?? ""}`;
};

/**汉字正则 */
export const chineseReg = /^[\u2E80-\u9FFF]+.*[\u2E80-\u9FFF]*$/;

interface Props {
    lastName: string;
    firName: string;
    gender: string;
    year: string;
    month: string;
}

/**
 *要还原的转化为16进制的文字
 */
export const decode = (res: string): Props | undefined => {
    if (res.includes("-") && res.includes(".")) {
        const data = res.split("-")[1]?.split(".")[0];

        const arr = data.split("&");

        return {
            lastName: arr[0],
            firName: arr[1],
            gender: arr[2],
            year: arr[3],
            month: arr[4],
        };
    }
    return undefined;
};

export const getStateData = (): Props | undefined => {
    const data = comms.state as Record<string, string>;
    let str = "";
    for (const key in data) {
        str = data[key];
    }
    return decode(str);
};
