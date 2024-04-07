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
import { CaptchaType } from '../../common/utils/constants'

import * as dayjs from 'dayjs'
import { EmailService } from 'src/tool/email/email.service'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import { CategoryService } from '../category/category.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectEntityManager()
        private readonly userManager: EntityManager,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly emailService: EmailService,
        private readonly redisService: RedisService,
        private readonly categoryService: CategoryService
    ) {}

    /**
     * 登录
     * @param user
     * @returns
     */
    async login(user: LoginUserDto): Promise<ResultData> {
        const checkPassword = encryptPassword(user.password)

        const params = {
            password: checkPassword,
            [validEmail(user.account) ? 'email' : 'nick_name']: user.account
        }

        const data = await this.userRepo.findOneBy(params)
        if (!data) return ResultData.fail(HttpCode.BadRequest, '帐号或密码错误')

        const token = this.generateToken({ id: data.id })
        const result = {
            data: { ...instanceToPlain(data) },
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }
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
        const checkUser = await this.userRepo.findOneBy({ email: account })
        if (checkUser)
            return ResultData.fail(HttpCode.BadRequest, '当前邮箱已存在，请调整后重新注册')
        const userData = {
            id: generateId(6),
            email: account,
            password: encryptPassword(password),
            // TODO: 后续两个值由前端提供
            avatar: '',
            nick_name: '随机用户1'
        }
        // plainToInstance  忽略转换 @Exclude 装饰器
        const data = plainToInstance(UserEntity, userData, { ignoreDecorators: true })
        const result = await this.userManager.transaction(async (transactionalEntityManager) => {
            return await transactionalEntityManager.save<UserEntity>(data)
        })
        const token = this.generateToken({ id: data.id })
        const res = {
            data: {
                ...instanceToPlain(result)
            },
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }
        // 为新用户创建默认知识库 异步 开线程池
        this.categoryService.createDefaultCategory(data)
        return ResultData.ok(res)
    }

    /**
     * 发送验证码
     */
    async sendCaptcha(email: string, captcha: string, type: CaptchaType): Promise<ResultData> {
        if (type === CaptchaType.REGISTER) {
            const checkUser = await this.userRepo.findOneBy({ email })
            if (checkUser)
                return ResultData.fail(HttpCode.BadRequest, '当前邮箱已存在，请调整后重新注册')
        }
        // 验证邮箱
        if (!validEmail(email)) return ResultData.fail(HttpCode.BadRequest, '邮箱格式错误')
        const isSendSuccess = await this.emailService.sendMail({ email, captcha })
        if (isSendSuccess) {
            return ResultData.ok(null, '发送成功')
        }
        return ResultData.fail(HttpCode.BadRequest, '发送失败')
    }

    /**
     * 忘记密码
     */
    async forget(dto: ForgetPasswordDto): Promise<ResultData> {
        const { account: email, password, confirmPassword } = dto
        if (!validEmail(email)) return ResultData.fail(HttpCode.BadRequest, '邮箱格式错误')
        if (password != confirmPassword)
            return ResultData.fail(HttpCode.BadRequest, '两次密码不一致')
        if (!validPassword(password))
            return ResultData.fail(HttpCode.BadRequest, '密码必须有数字+字母组成，且长度至少8位数')
        const checkUser = await this.userRepo.findOneBy({ email })
        if (checkUser) {
            if (checkUser.password === encryptPassword(password))
                return ResultData.fail(HttpCode.BadRequest, '新密码不能与旧密码相同')
            const { id } = checkUser
            await this.userRepo.update(id, {
                password: encryptPassword(password)
            })
            return ResultData.ok(null)
        } else {
            return ResultData.fail(HttpCode.BadRequest, '当前邮箱未注册')
        }
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
        // refreshToken
        return ResultData.ok({ accessToken })
    }

    async findOneById(id: string): Promise<UserEntity> {
        const result = await this.userRepo.findOne({ where: { id } })
        // plainToInstance 去除 password slat
        const user = plainToInstance(UserEntity, result, { enableImplicitConversion: true })
        if (user) {
            user.password = ''
            return user
        }
        return null
    }

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
