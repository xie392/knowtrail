export enum HttpCode {
    Ok = 200,
    MovedPermanently = 301,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405
}

export const ErrorCodeMap = {
    // 10000 - 99999 业务操作错误
    10000: '参数校验异常',
    10001: '系统用户已存在',
    10002: '填写验证码有误',
    10003: '用户名密码有误',
    10011: '旧密码与原密码不一致',
    10016: '系统内置功能不允许操作',
    10017: '用户不存在',

    // token相关
    11001: '登录无效或无权限访问',
    11002: '登录身份已过期',
    11003: '无权限，请联系管理员申请权限',

    // OSS相关
    20001: '当前创建的文件或目录已存在',
    20002: '无需操作',
    20003: '已超出支持的最大处理数量'
} as const

export enum CaptchaType {
    // 注册
    REGISTER = 'register',
    // 找回密码
    FORGET = 'forget'
}

// export enum ErrorMessage {
//     Ok = 'OK',
//     Created = 'Created',
//     Accepted = 'Accepted',
//     NoContent = 'No Content',
//     MovedPermanently = 'Moved Permanently',
//     BadRequest = 'Bad Request',
//     Unauthorized = 'Unauthorized',
//     Forbidden = 'Forbidden',
//     NotFound = 'Not Found',
//     MethodNotAllowed = 'Method Not Allowed',
//     NotAcceptable = 'Not Acceptable',
//     Conflict = 'Conflict',
//     Gone = 'Gone',
//     PreconditionFailed = 'Precondition Failed',
//     UnprocessableEntity = 'Unprocessable Entity'
// }

// export const secret = 'KnowTaril'
// export const port = 3000
