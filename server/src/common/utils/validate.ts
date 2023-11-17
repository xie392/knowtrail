// https://github.com/VincentSit/ChinaMobilePhoneNumberRegex/blob/master/README-CN.md
export function validPhone(phone: string): boolean {
    const regx =
        /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/
    return regx.test(phone)
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

// export function validPassword(password: string): boolean {
//     const regx = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
//     return regx.test(password)
// }

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
