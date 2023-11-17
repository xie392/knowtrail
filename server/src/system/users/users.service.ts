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
// import { RedisService } from '../../common/lib/redis/redis.service'
import { validEmail, validPassword } from '../../common/utils/validate'
import { encryptPassword } from '../../common/utils/crypto'
import { generateId } from '../../common/utils/utils'

import * as dayjs from 'dayjs'
import { EmailService } from 'src/tool/email/email.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectEntityManager()
        private readonly userManager: EntityManager,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly emailService: EmailService
    ) {}

    /**
     * 登录
     * @param user
     * @returns
     */
    async login(user: LoginUserDto): Promise<ResultData> {
        let data = null
        const checkPassword = encryptPassword(user.password)
        console.log('password', checkPassword)

        if (validEmail(user.account)) {
            data = await this.userRepo.findOneBy({
                email: user.account,
                password: checkPassword
            })
        } else {
            data = await this.userRepo.findOneBy({
                nick_name: user.account,
                password: checkPassword
            })
        }
        if (!data) return ResultData.fail(HttpCode.BadRequest, '帐号或密码错误')
        const token = this.generateToken({ id: data.id })
        // const token = this.jwtImplService.generateToken({ id: data.id })
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
        const checkUser = await this.userRepo.findOneBy({ email: account })
        if (checkUser)
            return ResultData.fail(HttpCode.BadRequest, '当前邮箱已存在，请调整后重新注册')
        const userData = {
            id: generateId(),
            email: account,
            password: encryptPassword(password),
            // TODO: 后续两个值由前端提供
            avatar: '',
            nick_name: ''
        }
        // plainToInstance  忽略转换 @Exclude 装饰器
        const data = plainToInstance(UserEntity, userData, { ignoreDecorators: true })
        const result = await this.userManager.transaction(async (transactionalEntityManager) => {
            return await transactionalEntityManager.save<UserEntity>(data)
        })
        const formatTime = dayjs(result.create_time).format('YYYY-MM-DD HH:mm:ss')
        const token = this.generateToken({ id: data.id })
        // const token = this.jwtImplService.generateToken({ id: data.id })
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
     * 发送验证码
     */
    async sendCaptcha(email: string, captcha: string): Promise<ResultData> {
        // 验证邮箱
        if (!validEmail(email)) return ResultData.fail(HttpCode.BadRequest, '邮箱格式错误')
        // console.log('user', user)
        const isSendSuccess = await this.emailService.sendMail({ email, captcha })
        if (isSendSuccess) {
            return ResultData.ok(null, '发送成功')
        }
        return ResultData.fail(HttpCode.BadRequest, '发送失败')
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
