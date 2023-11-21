export enum RouteName {
    // 首页
    HOME = 'home',
    // 登录
    LOGIN = 'login',
    // 注册
    REGISTER = 'register',
    // 找回密码
    FORGET = 'forget',
    // 个人中心
    USER = 'user',
    // 错误
    ERROR = 'error',
    // 404
    NOT_FOUND = '404',
    // 游乐场
    PLAYGROUND = 'playground',
    // 笔记
    NOTE = 'note',
    // 知识库
    BOOKS = 'books',
    // 知识库详情
    READ = 'read',
    // 工作区
    WORKSPACE = 'workspace',
    // 工作区开始页
    DASHBOARD = 'dashboard',
    // 收藏
    COLLECTION = 'collection',
    // 关注
    FOCUS = 'focus',
    // 消息
    MESSAGE = 'message',
    // 模板
    TEMPLATE = 'template',
    // 知识库
    KNOWLEDGE = 'knowledge',
    // 编辑页
    EDIT = 'edit',
    // 编辑器
    EDITOR = 'editor'
}

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
