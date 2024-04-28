import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
// import { UpdateCategoryDto } from './dto/update-category.dto'

import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Repository, EntityManager } from 'typeorm'
import { instanceToPlain, plainToInstance } from 'class-transformer'
// import { pick } from 'lodash'

import { ResultData } from '../../common/utils/result'
import { HttpCode } from '../../common/utils/constants'
import { generateId } from '../../common/utils/utils'

import { CategoryEntity } from './entities/category.entity'
import { UserEntity } from '../users/entities/user.entity'
import { encryptPassword } from 'src/common/utils/crypto'
import { DocEntity } from '../doc/entities/doc.entity'

interface Params {
    page: number
    limit: number
}

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly cateRepo: Repository<CategoryEntity>,
        @InjectEntityManager()
        private readonly docManager: EntityManager
    ) {}

    async create(dto: CreateCategoryDto, user: UserEntity) {
        try {
            if (!dto.title) return ResultData.fail(HttpCode.BadRequest, '创建知识库失败')
            if (dto.description && dto.description.length > 500)
                return ResultData.fail(HttpCode.BadRequest, '描述内容超出字数要求')
            let data: any = {
                ...dto,
                id: generateId(8),
                user_id: user.id,
                status: dto?.status ?? 0
            }

            // 先查找有无相同名称的知识库
            const category = await this.docManager.findOne(CategoryEntity, {
                where: {
                    title: dto.title,
                    user_id: user.id
                }
            })
            if (category) return ResultData.fail(HttpCode.BadRequest, '知识库名称已存在')
            // 创建知识库
            data = plainToInstance(CategoryEntity, data, { ignoreDecorators: true })
            const result = await this.docManager.transaction(async (transactionalEntityManager) => {
                return await transactionalEntityManager.save<CategoryEntity>(data)
            })
            return ResultData.ok(instanceToPlain(result))
        } catch (error) {
            console.log('创建知识库失败', error)
            return ResultData.fail(HttpCode.BadRequest, '创建知识库失败')
        }
    }

    /**
     * 创建默认知识库
     * @param dto
     * @param user
     * @returns
     */
    async createDefaultCategory(user: UserEntity) {
        const dto = {
            id: generateId(),
            user_id: user.id,
            default: 1,
            title: '默认知识库',
            description: '默认知识库'
        }
        return this.docManager.transaction(async (transactionalEntityManager) => {
            const data = plainToInstance(CategoryEntity, dto, { ignoreDecorators: true })
            return await transactionalEntityManager.save<CategoryEntity>(data)
        })
    }

    /**
     * 查找个人所有知识库
     * @param params
     * @param params.page
     * @param params.limit
     * @returns
     */
    async findUserAll(params: { page: number; limit: number }, user: UserEntity) {
        try {
            const { page = 1, limit = 10 } = params
            const skip = (page - 1) * limit

            const [list, total] = await this.docManager.findAndCount(CategoryEntity, {
                skip,
                take: limit,
                where: {
                    user_id: user.id,
                    hidden: 1
                },
                relations: ['user']
            })
            return ResultData.ok({
                list: instanceToPlain(list),
                page,
                total
            })
        } catch (error) {
            console.error('查询所有知识库失败：', error)
            return ResultData.fail(HttpCode.BadRequest, '查找失败')
        }
    }

    /**
     * 查询知识库
     * @param id 知识库id
     * @param password  密码
     * @param user    用户
     * @returns
     */
    async findOne(id: string, user: UserEntity, password: string) {
        try {
            const params = { id, password: password, hidden: 1 }
            if (user) params['user_id'] = user.id
            if (!password) delete params.password
            const category = await this.docManager.findOne(CategoryEntity, {
                where: params,
                relations: ['user', 'doc']
            })
            if (!category) return ResultData.fail(HttpCode.NotFound, '知识库不存在')

            // 判断是不是私密且是自己的
            if (category.status === 0 && user?.id !== category.user_id) {
                return ResultData.fail(HttpCode.Unauthorized, '该知识库私密')
            }

            // 如果是自己请求就不需要校验密码
            if (
                user &&
                user?.id !== category.user_id &&
                category.password &&
                category.password !== encryptPassword(password)
            )
                return ResultData.fail(HttpCode.Unauthorized, '密码错误')

            // 过滤隐藏的文档
            category.doc = category.doc.filter((doc) => doc.hidden === 1)
            return ResultData.ok(instanceToPlain(category))
        } catch (error) {
            console.error('查询知识库失败：', error)
            return ResultData.fail(HttpCode.BadRequest, '查找失败')
        }
    }

    /**
     * 删除知识库
     * @param id 知识库id
     * @param user 用户
     * @returns
     */
    async remove(id: string, user: UserEntity) {
        try {
            const category = await this.docManager.findOne(CategoryEntity, {
                where: {
                    id,
                    user_id: user.id,
                    hidden: 1
                }
            })
            if (!category) return ResultData.fail(HttpCode.BadRequest, '知识库不存在')
            category.hidden = 0

            // 删除该库下面的所有文档
            const docs = await this.docManager.find(DocEntity, {
                where: {
                    category_id: id
                }
            })

            docs.forEach((doc) => {
                doc.hidden = 0
            })

            await this.docManager.transaction(async (transactionalEntityManager) => {
                return await transactionalEntityManager.save<CategoryEntity>(category)
            })
            await this.docManager.transaction(async (transactionalEntityManager) => {
                return await transactionalEntityManager.save<DocEntity>(docs)
            })
            return ResultData.ok(null)
        } catch (error) {
            console.error('删除知识库失败：', error)
            return ResultData.fail(HttpCode.BadRequest, '删除失败')
        }
    }

    /**
     * 更新知识库
     * @param id 知识库id
     * @param dto 更新数据
     * @param user 用户
     * @returns
     */
    // async update(id: string, dto: UpdateCategoryDto, user: UserEntity) {
    //     try {
    //         const category = await this.docManager.findOne(CategoryEntity, {
    //             where: {
    //                 id,
    //                 user_id: user.id,
    //                 hidden: 1
    //             }
    //         })
    //         if (!category) return ResultData.fail(HttpCode.BadRequest, '知识库不存在')
    //         const data = pick(dto, ['title', 'description', 'password'])
    //         if (dto.password) {
    //             data.status = 2
    //             data.password = encryptPassword(dto.password)
    //         }
    //         category.title = data.title
    //         category.description = data.description
    //         category.password = data.password
    //         category.status = data.status
    //         return await this.docManager.transaction(async (transactionalEntityManager) => {
    //             return await transactionalEntityManager.save<CategoryEntity>(category)
    //         })
    //     } catch (error) {
    //         console.error('更新知识库失败：', error)
    //         return ResultData.fail(HttpCode.BadRequest, '更新失败')
    //     }
    // }

    /**
     * 获取最近创建的知识库
     * @param user 用户
     * @param params     { page: number, limit: number, sort: string }
     */
    async getLastCreated(user: UserEntity) {
        try {
            // 查找前面 3 条
            const categories = await this.docManager.find(CategoryEntity, {
                where: {
                    user_id: user.id,
                    hidden: 1
                },
                order: {
                    update_time: 'DESC'
                },
                take: 3,
                relations: ['user']
            })
            return ResultData.ok(instanceToPlain(categories))
        } catch (error) {
            console.error('获取最近的知识库失败：', error)
            return ResultData.fail(HttpCode.BadRequest, '获取失败')
        }
    }

    /**
     * 获取开放的知识库
     * @param {string} id 用户 id
     * @param {Params} params 分页参数
     * @returns
     */
    async getOpenCategory(id: string, params: Params) {
        try {
            const { page = 1, limit = 6 } = params
            const skip = (page - 1) * limit

            const [list, total] = await this.docManager.findAndCount(CategoryEntity, {
                skip,
                take: limit,
                where: {
                    user_id: id,
                    status: 1,
                    hidden: 1
                },
                relations: ['user']
            })
            return ResultData.ok({
                list: instanceToPlain(list),
                page,
                total
            })
        } catch (error) {
            console.error('获取开放的知识库失败：', error)
            return ResultData.fail(HttpCode.BadRequest, '获取失败')
        }
    }
}
