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

/**汉字正则 */
export const chineseReg = /^[\u2E80-\u9FFF]+.*[\u2E80-\u9FFF]*$/;
