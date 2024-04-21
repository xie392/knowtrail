import request from '@/utils/request'
import type { CreateDoc, DocListParams, DocParams, UpdateDoc } from '@/models/doc'

/**
 * 文档接口集合类
 */
export class CategoryService {
    private static readonly http: typeof request = request
    private static readonly prefix: string = 'category'

    /**
     * 创建知识库
     * @param data
     * @param data.title    文档标题
     * @param data.content  文档内容
     * @param data.tags     文档标签
     * @param data.pid      父级文档ID 可以不传，不传即代表添加到默认知识库
     * @param data.isPublic 是否公开
     * @param data.password 文档密码
     * @returns
     */
    static CreateCategoryApi(data?: CreateDoc): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/create`, method: 'post', data })
    }

    /**
     * 更新文档
     * @param data
     * @param data.id       文档ID
     * @param data.title    文档标题
     * @param data.content  文档内容
     * @param data.tags     文档标签
     * @param data.pid      父级文档ID 可以不传，不传即代表添加到默认知识库
     * @param data.isPublic 是否公开
     * @param data.password 文档密码
     * @returns
     */
    static UpdateCategoryApi(data: UpdateDoc): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/doc/${data.id}`, method: 'patch', data })
    }

    /**
     * 根据 id 查询文档
     * @param id 文档 id
     * @param password 文档密码
     * @returns
     */
    static GetCategoryByIdApi(id: string, password?: string): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/doc/${id}`, method: 'get', params: { password } })
    }

    /**
     * 删除文档
     * @param id 文档 id
     * @returns
     */
    static DeleteCategoryApi(id: string): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/doc/${id}`, method: 'delete' })
    }

    /**
     * 查询文档列表
     * @param params
     * @param params.keyword 关键字
     * @param params.page 页码
     * @returns
     */
    static GetCategoryListApi(params?: DocListParams): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/list`, method: 'get', params })
    }

    /**
     * 搜索
     * @param params
     * @param params.keyword 关键字
     * @param params.page 页码
     * @param params.limit 每页数量
     * @returns
     */
    static SearchApi(params: DocParams): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/search`, method: 'get', params })
    }

    /**
     * 获取最近的知识库
     * @param page 页码
     * @param limit 每页数量
     * @param sort 排序方式
     * @returns
     */
    static GetRecentCategoryApi(): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/last/carate`, method: 'get' })
    }

    /**
     * 获取用户开放的知识库列表
     * @param id 用户 id
     * @param params
     * @param params.page 页码
     * @param params.limit 每页数量
     */
    static GetUserCategoryApi(id: string, params: DocListParams): Promise<DataResponse> {
        return this.http({ url: `/${this.prefix}/list/${id}`, method: 'get', params })
    }
}
