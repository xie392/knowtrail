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
