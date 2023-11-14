import { customAlphabet } from 'nanoid'

/**
 * 下划线转驼峰
 * @param str
 * @returns
 */
export function toCamelCase(str: string): string {
    return str.replace(/_(\w)/g, (_, c) => c.toUpperCase())
}

/**
 * 驼峰命名转下划线
 * @param str
 * @returns
 */
export function toUnderline(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 对象 key 下划线转驼峰，驼峰转下划线
 * @param target 目标
 * @param targetType
 * @param cutStr 对象 key 裁剪字段
 * @returns
 */
export function objAttrToCamelOrUnderline(
    target: Record<string, any>,
    targetType: 'camelCase' | 'underline',
    cutStr?: string
) {
    const _target = {}
    Object.keys(target).forEach((k) => {
        let _k = k
        if (!!cutStr) {
            _k = _k.replace(cutStr, '')
        }
        _k = targetType === 'camelCase' ? toCamelCase(_k) : toUnderline(_k)
        _target[_k] = target[k]
    })
    return _target
}

/**
 * 生成 id
 * @param {number}
 * @returns
 */
export function generateId(len: number = 10) {
    const randomId = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', len)
    return randomId()
}
