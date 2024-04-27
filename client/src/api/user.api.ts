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
    static LoginApi(data: LoginData): Promise<DataResponse> {
        return this.http({ url: '/login', method: 'post', data })
    }

    /**
     * Register
     * @param data
     * @param data.account 账号
     * @param data.password 密码
     * @param data.confirmPassword 确认密码
     * @param data.captcha 验证码
     * @returns
     */
    static RegisterApi(data: RegisterData): Promise<DataResponse> {
        return this.http({ url: '/register', method: 'post', data })
    }

    /**
     * 刷新 token
     * @param data
     * @param data.refreshToken
     * @returns
     */
    static RefreshApi(data: RefreshData): Promise<DataResponse> {
        return this.http({ url: '/refresh', method: 'post', data })
    }

    /**
     * 获取邮箱验证码
     * @param data
     * @param data.email 邮箱
     * @returns
     */
    static sendEmailApi(data: EmailCodeData, type: 'forget' | 'register'): Promise<DataResponse> {
        return this.http({ url: `/captcha/${type}`, method: 'post', data })
    }

    /**
     * 重置密码
     * @param data
     * @param data.account 账号
     * @param data.password 密码
     * @param data.confirmPassword 确认密码
     * @param data.captcha 验证码
     */
    static forgetPasswordApi(data: RegisterData): Promise<DataResponse> {
        return this.http({ url: '/forget', method: 'post', data })
    }

    /**
     * 获取用户信息
     * @returns
     */
    static getUserInfoApi(id: string): Promise<DataResponse> {
        return this.http({ url: `/user/${id}`, method: 'get' })
    }

    /**
     * 更新用户信息
     * @param data
     * @param data.nick_name 昵称
     * @param data.avatar 头像
     */
    static updateUserInfoApi(id: string, data: { nick_name: string; avatar: string }): Promise<DataResponse> {
        return this.http({ url: `/user/${id}`, method: 'patch', data })
    }
}
