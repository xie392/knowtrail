/**
 * 格式化数字
 * @param number
 * @returns
 */
export const useFormatNumber = (number: number): string => {
    if (number > 100000000) {
        return (number / 100000000).toFixed(1) + '亿'
    }
    if (number > 10000) {
        return (number / 10000).toFixed(1) + '万'
    }
    return number.toString()
}

