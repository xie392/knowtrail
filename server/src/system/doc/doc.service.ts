import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, EntityManager } from 'typeorm'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { pick } from 'lodash'

import { CreateDocDto } from './dto/create-doc.dto'
import { UpdateDocDto } from './dto/update-doc.dto'

import { DocEntity } from './entities/doc.entity'
import { UserEntity } from '../users/entities/user.entity'

import { ResultData } from '../../common/utils/result'
import { HttpCode } from '../../common/utils/constants'
import { CategoryEntity } from '../category/entities/category.entity'

import { generateId } from '../../common/utils/utils'

interface DocParams {
    id: string
    password?: string
    status: number
    hidden: number
}
const doc_keys = ['id', 'title', 'cover', 'create_time', 'update_time', 'category_id', 'content']
const author_keys = ['id', 'name', 'avatar']

@Injectable()
export class DocService {
    constructor(
        @InjectRepository(DocEntity)
        private readonly docRepo: Repository<DocEntity>,
        @InjectEntityManager()
        private readonly docManager: EntityManager
    ) {}

    /**
     * 查询文档
     * @param id  文档 id
     * @returns
     */
    async findOne(id: string, password?: string): Promise<ResultData> {
        try {
            const params: DocParams = { id, status: 1, hidden: 1 }
            // 如果是私有文档,就添加私有文档查询参数
            if (password) {
                params.password = password
                params.status = 0
            }
            // 联合查询
            const doc = await this.docManager.findOne(DocEntity, {
                where: params,
                relations: ['user']
            })
            const result = instanceToPlain(doc)
            if (result) {
                const data = {
                    ...pick(result, doc_keys),
                    author: { ...pick(result.user, author_keys), is_focused: false },
                    is_liked: false,
                    is_starred: false,
                    is_private: result.status === 1 ? false : true
                }
                return ResultData.ok(data)
            }
            return password
                ? ResultData.fail(HttpCode.BadRequest, '密码错误')
                : ResultData.fail(HttpCode.NotFound, '文档不存在')
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '查询文档失败')
        }
    }

    /**
     * 创建文档
     * @param dto
     * @param user
     * @returns
     */
    async create(dto: CreateDocDto, user: UserEntity): Promise<ResultData> {
        try {
            if (!dto) dto = {}
            let data: any = null
            let category: CategoryEntity = null
            if (!dto.pid) {
                category = await this.docManager.findOne(CategoryEntity, {
                    where: {
                        default: 1
                    }
                })

                if (!category) return ResultData.fail(HttpCode.BadRequest, '没有默认分类')
            }
            data = {
                ...dto,
                title: dto.title || '未命名文档',
                id: generateId(8),
                user_id: user.id,
                category_id: category?.id ? category.id : dto.pid,
                status: category?.status ?? 1
            }
            data = plainToInstance(DocEntity, data, { ignoreDecorators: true })
            const result = await this.docManager.transaction(async (transactionalEntityManager) => {
                return await transactionalEntityManager.save<DocEntity>(data)
            })
            return ResultData.ok(instanceToPlain(result))
        } catch (error) {
            console.log('创建文档失败：', error)
            return ResultData.fail(HttpCode.BadRequest, '创建文档失败')
        }
    }

    /**
     * 更新文档
     * @param dto
     * @param user
     * @returns
     */
    async update(id: string, dto: UpdateDocDto, user: UserEntity): Promise<ResultData> {
        try {
            // 获取文档
            const doc = await this.docManager.findOne(DocEntity, {
                where: {
                    id,
                    hidden: 1
                }
            })
            if (!doc) return ResultData.fail(HttpCode.BadRequest, '文档不存在')
            if (doc.user_id !== user.id) return ResultData.fail(HttpCode.BadRequest, '没有权限修改')

            const data = Object.assign(
                doc,
                pick(dto, ['title', 'cover', 'content', 'p_id', 'tag_type'])
            )

            // 如果没有标题就给一个默认标题
            if (!data.title) data.title = '无标题文档'

            // 更新文档
            const result = await this.docManager.transaction(async (transactionalEntityManager) => {
                return await transactionalEntityManager.save<DocEntity>(data)
            })
            return ResultData.ok(instanceToPlain(result))
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '更新失败')
        }
    }

    /**
     * 删除文档
     * @param id    文档 id
     * @param user  用户
     * @returns
     */
    async remove(id: string, user: UserEntity): Promise<ResultData> {
        try {
            // 获取文档
            const doc = await this.docManager.findOne(DocEntity, {
                where: {
                    id,
                    hidden: 1
                }
            })
            if (!doc) return ResultData.fail(HttpCode.BadRequest, '文档不存在')
            if (doc.user_id !== user.id) return ResultData.fail(HttpCode.BadRequest, '没有权限删除')
            doc.hidden = 0
            await this.docManager.transaction(async (transactionalEntityManager) => {
                return await transactionalEntityManager.save<DocEntity>(doc)
            })
            return ResultData.ok(null)
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '删除失败')
        }
    }

    /**
     * 查询所有文档
     * @param page       页码
     * @param limit      条数
     * @returns
     */
    async findAll(page: number, limit: number): Promise<ResultData> {
        try {
            const [docs, total] = await this.docRepo.findAndCount({
                where: {
                    status: 1,
                    hidden: 1
                },
                relations: ['user'],
                take: limit,
                skip: (page - 1) * limit
            })
            const data = docs.map((doc) =>
                instanceToPlain(doc, {
                    excludePrefixes: ['user']
                })
            )
            return ResultData.ok({
                docs: data,
                total,
                page,
                limit
            })
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '查询文档失败')
        }
    }

    /**
     * 模糊查询
     * @param keyword    关键字
     * @param page       页码
     * @param limit      条数
     * @returns
     */
    async search(keyword: string, page: number, limit: number): Promise<ResultData> {
        try {
            const [docs, total] = await this.docRepo.findAndCount({
                where: {
                    status: 1,
                    hidden: 1,
                    title: Like(`%${keyword}%`)
                },
                relations: ['user'],
                take: limit
            })
            const data = docs.map((doc) => instanceToPlain(doc))
            return ResultData.ok({
                docs: data,
                total
            })
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '查询文档失败')
        }
    }

    /**
     * 推荐查询
     *
     * @param page       页码
     * @param limit      条数
     * @returns
     */
    async recommend(page: number, limit: number): Promise<ResultData> {
        try {
            const [docs, total] = await this.docRepo.findAndCount({
                where: {
                    status: 1,
                    hidden: 1
                },
                relations: ['user'],
                take: limit,
                skip: (page - 1) * limit
            })
            const data = docs.map((doc) => instanceToPlain(doc))

            return ResultData.ok({
                docs: data,
                total,
                page: Number(page),
                limit: Number(limit)
            })
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '查询文档失败')
        }
    }

    /**
     * 搜索自己的文档
     * @param keyword    关键字
     * @param user       用户
     * @param page       页码
     * @param limit      条数
     */
    async searchMyDoc(
        keyword: string,
        user: UserEntity,
        page: number,
        limit: number
    ): Promise<ResultData> {
        try {
            const [docs, total] = await this.docRepo.findAndCount({
                where: {
                    user_id: user.id,
                    hidden: 1,
                    title: Like(`%${keyword}%`)
                },
                take: limit,
                skip: (page - 1) * limit
            })
            const data = docs.map((doc) => instanceToPlain(doc))

            return ResultData.ok({
                docs: data,
                total,
                page: Number(page),
                limit: Number(limit)
            })
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '查询文档失败')
        }
    }

    /**
     * 获取最近更改的文档，获取 10 篇
     * @param user       用户
     * @returns
     */
    async getLastDocList(user: UserEntity): Promise<ResultData> {
        try {
            const [docs, total] = await this.docRepo.findAndCount({
                where: {
                    user_id: user.id,
                    hidden: 1
                },
                order: {
                    update_time: 'DESC'
                },
                relations: ['category', 'user'],
                take: 10
            })
            const data = docs.map((doc) => instanceToPlain(doc))
            return ResultData.ok({
                docs: data,
                total
            })
        } catch (error) {
            return ResultData.fail(HttpCode.BadRequest, '查询文档失败')
        }
    }
}
