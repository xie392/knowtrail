import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, In, EntityManager } from 'typeorm'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { pick } from 'lodash'

import { ResultData } from '../../common/utils/result'
import { HttpCode } from '../../common/utils/constants'
import { generateId } from '../../common/utils/utils'

import { CategoryEntity } from './entities/category.entity'
import { UserEntity } from '../users/entities/user.entity'
import { encryptPassword } from 'src/common/utils/crypto'

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
                status: dto?.password ? 2 : 0
            }
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
                    user_id: user.id
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
            const params = { id, user_id: user.id, password: password, hidden: 1 }
            if (!password) delete params.password
            const category = await this.docManager.findOne(CategoryEntity, {
                where: params,
                relations: ['user', 'doc']
            })
            if (!category) return ResultData.fail(HttpCode.NotFound, '知识库不存在')

            // 如果是自己请求就不需要校验密码
            if (
                user.id !== category.user_id &&
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
}
