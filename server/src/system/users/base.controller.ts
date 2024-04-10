import { Controller, Post, Body, UsePipes, Get, Req, Query, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { ApiResult } from '../../common/decorators/api-result.decorator'
import { AllowAnon } from '../../common/decorators/allow-anon.decorator'
import { ResultData } from '../../common/utils/result'
import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import { UserEntity } from './entities/user.entity'
import { LoginUserPipe, LoginUserPipeSchema } from './pipe/login-user.pipe'
import { CreateUserPipe, CreateUserPipeSchema } from './pipe/create-user.pipe'
import { HttpCode } from '../../common/utils/constants'
import { createCaptcha } from '../../common/utils/utils'
import { CaptchaType } from '../../common/utils/constants'

@ApiTags('登录相关')
@Controller()
export class BaseController {
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    @ApiOperation({ summary: '登录' })
    @ApiBody({ type: LoginUserDto })
    @ApiResult(UserEntity)
    @AllowAnon()
    @UsePipes(new LoginUserPipe(LoginUserPipeSchema))
    async login(@Body() user: LoginUserDto): Promise<ResultData> {
        return await this.usersService.login(user)
    }

    @Post('register')
    @ApiOperation({ summary: '注册' })
    @ApiBody({ type: CreateUserDto })
    @ApiResult(UserEntity)
    @AllowAnon()
    @UsePipes(new CreateUserPipe(CreateUserPipeSchema))
    async create(@Body() user: CreateUserDto, @Req() req): Promise<ResultData> {
        // 验证验证码
        if (user.captcha !== req.session.captcha) {
            return ResultData.fail(HttpCode.BadRequest, '验证码错误')
        }
        return await this.usersService.create(user)
    }

    @Post('refresh')
    @ApiOperation({ summary: '刷新 token' })
    @ApiBody({ type: RefreshTokenDto })
    @AllowAnon()
    async refresh(@Body('refreshToken') refreshToken: string): Promise<ResultData> {
        return await this.usersService.refreshToken(refreshToken)
    }

    @Post('logout')
    @ApiOperation({ summary: '登出' })
    async logout(): Promise<ResultData> {
        return this.usersService.logout()
    }

    @Post('captcha/:type')
    @ApiOperation({ summary: '验证码' })
    @AllowAnon()
    async sendCaptcha(
        @Body('email') email: string,
        @Param('type') type: CaptchaType,
        @Req() req
    ): Promise<ResultData> {
        const { captcha, msg, success } = createCaptcha(req)
        if (!success) return ResultData.fail(HttpCode.BadRequest, msg)
        return await this.usersService.sendCaptcha(email, captcha, type)
    }

    @Post('forget')
    @ApiOperation({ summary: '重置密码' })
    @AllowAnon()
    async forget(@Body() dto: ForgetPasswordDto, @Req() req): Promise<ResultData> {
        // 验证验证码
        if (dto.captcha !== req.session.captcha) {
            return ResultData.fail(HttpCode.BadRequest, '验证码错误')
        }
        return await this.usersService.forget(dto)
    }
}
