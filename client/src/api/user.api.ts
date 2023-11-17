import request from '@/utils/request'
import type { LoginData, RegisterData, RefreshData, EmailCodeData } from '@/models/user'

/**
 * 用户管理接口集合类
 */
export class UserService {
    private static readonly http: typeof request = request

    /**
     * Login
     * @param data
     * @param data.account 账号
     * @param data.password 密码
     * @returns
     */
    static LoginApi(data: LoginData): Promise<Response> {
        return this.http({ url: '/login', method: 'post', data })
    }

    /**
     * Register
     * @param data
     * @param data.account 账号
     * @param data.password 密码
     * @param data.confirmPassword 确认密码
     * @returns
     */
    static RegisterApi(data: RegisterData): Promise<Response> {
        return this.http({ url: '/register', method: 'post', data })
    }

    /**
     * 刷新 token
     * @param data
     * @param data.refreshToken
     * @returns
     */
    static RefreshApi(data: RefreshData): Promise<Response> {
        return this.http({ url: '/refresh', method: 'post', data })
    }

    /**
     * 获取邮箱验证码
     * @param data
     * @param data.email 邮箱
     * @returns
     */
    static sendEmailApi(data: EmailCodeData): Promise<Response> {
        return this.http({ url: '/captcha', method: 'post', data })
    }
}
