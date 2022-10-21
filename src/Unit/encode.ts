/**
 * 要转化的文字
 * 转为16进制
 */
export const encode = (res: string): string => {
    if (res) {
        let enStr = "";
        for (let i = 0; i < res.length; i++) {
            enStr += res.charCodeAt(i).toString(36);
        }
        return enStr;
    }

    return res;
};
