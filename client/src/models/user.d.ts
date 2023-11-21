/**
 * 登录参数
 */
export interface LoginData {
    /**
     * 账号
     */
    account: string
    /**
     * 密码
     */
    password: string
}

/**
 * 注册参数
 */
export type RegisterData = LoginData & {
    /**
     * 确认密码
     */
    confirmPassword: string

    /**
     * 验证码
     */
    captcha: string
}

/**
 * 刷新 token
 */
export interface RefreshData {
    /**
     * refreshToken
     */
    refreshToken: string
}

/**
 * 邮箱验证码
 */
export interface EmailCodeData {
    /**
     * 邮箱
     */
    email: string
}

export type CaptchaType = 'forget' | 'register'
