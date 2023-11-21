import request from '@/utils/request'
import type { LoginData, RegisterData, RefreshData, EmailCodeData } from '@/models/user'

/**
 * 用户管理接口集合类
 */
export class DocService {
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
}
