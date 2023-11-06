import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, In, EntityManager } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { instanceToPlain, plainToInstance } from 'class-transformer'
// import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { CreateTokenDto } from './dto/create-token.dto'

import { UserEntity } from './entities/user.entity'

import { ResultData } from '../../common/utils/result'
import { HttpCode } from '../../common/utils/constants'
import { RedisService } from '../../common/lib/redis/redis.service'
import { validEmail, validPassword } from '../../common/utils/validate'
import { encryptPassword } from '../../common/utils/crypto'
import { generateId } from '../../common/utils/utils'

import * as dayjs from 'dayjs'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectEntityManager()
        private readonly userManager: EntityManager,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly redisService: RedisService
    ) {}

    /**
     * 登录
     * @param user
     * @returns
     */
    async login(user: LoginUserDto): Promise<ResultData> {
        let data = null
        const checkPassword = encryptPassword(user.password)
        if (validEmail(user.account)) {
            data = await this.userRepo.findOne({
                where: { email: user.account, password: checkPassword }
            })
        } else {
            data = await this.userRepo.findOne({
                where: { nick_name: user.account, password: checkPassword }
            })
        }
        if (!data) return ResultData.fail(HttpCode.BadRequest, '帐号或密码错误')
        const token = this.generateToken({ id: data.id })
        const result = {
            data: { ...data },
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }
        // 不需要显示密码
        delete result.data.password
        return ResultData.ok(result)
    }

    /**
     * 创建用户
     * @param user 用户信息
     * @returns
     */
    async create(user: CreateUserDto): Promise<ResultData> {
        const { account, password, confirmPassword } = user
        // 检查密码强度
        if (!validPassword(password))
            return ResultData.fail(HttpCode.BadRequest, '密码必须有数字+字母组成，且长度至少8位数')
        // 检查两次密码是否一致
        if (password !== confirmPassword)
            return ResultData.fail(HttpCode.BadRequest, '两次密码不一致')
        // 检查邮箱是否已经被注册
        const checkUser = await this.userRepo.findOne({ where: { email: account } })
        if (checkUser)
            return ResultData.fail(HttpCode.BadRequest, '当前邮箱已存在，请调整后重新注册')
        const time = new Date()
        // const nan = nanoid.customAlphabet('1234567890abcdefghigklmnopqrstuvwxyz', 10)
        const userData = {
            id: generateId(),
            email: account,
            password: encryptPassword(password),
            create_time: time,
            update_time: time,
            // TODO: 后续两个值由前端提供
            avatar: '',
            nick_name: ''
        }
        // plainToInstance  忽略转换 @Exclude 装饰器
        const data = plainToInstance(UserEntity, userData, { ignoreDecorators: true })
        const result = await this.userManager.transaction(async (transactionalEntityManager) => {
            return await transactionalEntityManager.save<UserEntity>(data)
        })
        const formatTime = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        const token = this.generateToken({ id: data.id })
        const res = {
            data: {
                ...result,
                create_time: formatTime,
                update_time: formatTime
            },
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }
        delete res.data.password
        return ResultData.ok(instanceToPlain(res))
    }

    /**
     * 验证 token
     * @param token
     * @returns
     */
    verifyToken(token: string) {
        try {
            if (!token) return null
            const id = this.jwtService.verify(token.replace('Bearer ', ''))
            return id
        } catch (error) {
            return null
        }
    }

    /**
     * 刷新 token
     * @param refreshToken
     * @returns
     */
    refreshToken(refreshToken: string): ResultData {
        const accessToken = this.jwtService.sign({ refreshToken })
        return ResultData.ok({ accessToken })
    }

    // findAll() {
    //     return `This action returns all users`
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} user`
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`
    // }

    // async findOneById(id: string): Promise<UserEntity> {
    // const redisKey = getRedisKey(RedisKeyPrefix.USER_INFO, id)
    // const result = await this.redisService.hGetAll(redisKey)
    // // plainToInstance 去除 password slat
    // let user = plainToInstance(UserEntity, result, { enableImplicitConversion: true })
    // if (!user?.id) {
    //     user = await this.userRepo.findOne({ where: { id } })
    //     user = plainToInstance(UserEntity, { ...user }, { enableImplicitConversion: true })
    //     await this.redisService.hmset(
    //         redisKey,
    //         instanceToPlain(user),
    //         ms(this.config.get<string>('jwt.expiresin')) / 1000
    //     )
    // }
    // user.password = ''
    // user.salt = ''
    // return null
    // }

    /**
     * 生成 token 与 刷新 token
     * @param payload
     * @returns
     */
    generateToken(payload: { id: string }): CreateTokenDto {
        const accessToken = `Bearer ${this.jwtService.sign(payload)}`
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.config.get('jwt.refreshExpiresIn')
        })
        return { accessToken, refreshToken }
    }
}
