export enum CaptchaType {
    // 注册
    REGISTER = 'register',
    // 找回密码
    FORGET = 'forget'
}

export const CommonRules = {
    account: [{ required: true, message: '账号不能为空', type: 'warning' }],
    captcha: [{ required: true, message: '邮箱验证码不能为空', type: 'warning' }],
    password: [{ required: true, message: '密码不能为空', type: 'warning' }],
    confirmPassword: [{ required: true, message: '确认密码不能为空', type: 'warning' }]
}

export const LoginRules = {
    account: [{ required: true, message: '账号不能为空', type: 'warning' }],
    password: [{ required: true, message: '密码不能为空', type: 'warning' }]
}

export enum Status {
    EDIT = 'Edit',
    PREVIEW = 'preview'
}

export const HeaderWhiteList: string[] = ['home', 'playground', 'notes', 'books', 'read', 'search']

// Token
export const TOKEN = '__TOKEN__'
// ID
export const ID = '__USER_ID__'
// 数据库名
export const DATA_BASE_NAME = '__DATA_BASE_'

export const BASE_URL =
    import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PRO_BASE_URL
