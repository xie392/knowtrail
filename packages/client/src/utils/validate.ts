/**
 * 验证密码是否符合以下规则：
 * 1. 密码长度为6-16位
 * 2. 密码包含至少一个数字和一个字母
 * @param password 密码字符串
 * @returns 若密码符合以上规则则返回true，否则返回false
 */
export function validPassword(password: string): boolean {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    return reg.test(password)
}

/**
 * 验证邮箱格式是否有效
 * @param email 邮箱地址
 * @returns 如果邮箱格式有效则返回true，否则返回false
 */
export function validEmail(email: string): boolean {
    const regx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return regx.test(email)
}