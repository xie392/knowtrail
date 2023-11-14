import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, In, EntityManager } from 'typeorm'
import { instanceToPlain, plainToInstance, classToPlain } from 'class-transformer'
import { pick } from 'lodash'

import { CreateDocDto } from './dto/create-doc.dto'
import { UpdateDocDto } from './dto/update-doc.dto'
import { FindDocDto } from './dto/find-doc.dto'

import { DocEntity } from './entities/doc.entity'
import { UserEntity } from '../users/entities/user.entity'

import { ResultData } from '../../common/utils/result'
import { HttpCode } from '../../common/utils/constants'
import { CategoryEntity } from '../category/entities/category.entity'

import { JwtService } from '@nestjs/jwt'
import { getUserId } from '../../common/utils/jwt'
import { JwtImplService } from '../../common/utils/jwt'

interface DocParams {
    id: string
    password?: string
    status: number
}
const doc_keys = ['id', 'title', 'cover', 'create_time', 'update_time', 'category_id', 'content']
const author_keys = ['id', 'name', 'avatar']

@Injectable()
export class DocService {
    constructor(
        @InjectRepository(DocEntity)
        private readonly docRepo: Repository<DocEntity>,
        @InjectEntityManager()
        private readonly docManager: EntityManager,
        // private readonly jwtService: JwtService,
        private readonly jwtImplService: JwtImplService
    ) {}

    /**
     * 查询文档
     * @param id  文档 id
     * @returns
     */
    async findOne(id: string, password?: string): Promise<ResultData> {
        const params: DocParams = { id, status: 1 }
        // 如果是私有文档,就添加私有文档查询参数
        if (password) {
            params.password = password
            params.status = 0
        }
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
    }

    async create(dto: CreateDocDto, token: string): Promise<ResultData> {
        const userId = this.jwtImplService.getUserId(token)
        // const userId = getUserId(this.jwtService, token)
        console.log('userId', userId)
        if (!userId) return ResultData.fail(HttpCode.Unauthorized, 'token 验证失败')
        return ResultData.ok('11')
    }
}

// const doc = await this.docRepo
//     .createQueryBuilder('doc')
//     .leftJoinAndSelect(UserEntity, 'user', 'doc.id = user.id')
//     .select( `
//         doc.id,
//         doc.title,
//         doc.user_id,
//         doc.content,
//         doc.cover,
//         doc.create_time,
//         doc.update_time,
//         doc.category_id,
//         user.nick_name,
//         user.avatar
//     `)
//     .getRawMany()
