/**
 *
 * @param {number} length =>  The length to be cut
 * @param {number} val => The value to intercept
 * @returns {string}
 */

export const addZero = (length: number, val: number): string => {
    let str = "";
    for (let i = 0; i < length; i++) {
        str += "0";
    }
    str += val;
    return str.substring(str.length - length, str.length);
};
