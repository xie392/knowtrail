import { MD5 } from 'crypto-js'

/**
 * 密码加密
 * @param {string} value 要加密的内容
 * @returns string
 */
export function encryptPassword(value: string): string {
    return MD5(value).toString()
}
