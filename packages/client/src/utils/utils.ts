/**
 * 将查询参数添加到路径中
 * @param path 路径
 * @returns 组合后的路径
 */
export function joinPath(path: string, str: string = '?'): string {
    const url = path?.split('?')?.[1]
    if (!url) return ''
    return str + url
}

/**
 * 防抖
 * @param fn 回调函数
 * @param delay 延迟时间
 * @returns 防抖后的回调函数
 * @example
 * const fn = debounce(() => {
 *    console.log('hello')
 * }, 300)
 * fn()
 */
export function debounce(fn: Function, delay: number = 300): Function {
    let timer: NodeJS.Timeout
    return function (this: any, ...args: any[]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

