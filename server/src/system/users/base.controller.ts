import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'

import { UsersService } from './users.service'

import { ApiResult } from '../../common/decorators/api-result.decorator'
import { AllowAnon } from '../../common/decorators/allow-anon.decorator'

import { ResultData } from '../../common/utils/result'

import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

import { UserEntity } from './entities/user.entity'

import { LoginUserPipe, LoginUserPipeSchema } from './pipe/login-user.pipe'
import { CreateUserPipe, CreateUserPipeSchema } from './pipe/create-user.pipe'

// import { Request } from 'express'
// import * as useragent from 'express-useragent'

@Controller()
@ApiTags('登录注册')
export class BaseController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/login')
    @ApiOperation({ summary: '登录' })
    @ApiBody({ type: LoginUserDto })
    @ApiResult(UserEntity)
    @AllowAnon()
    @UsePipes(new LoginUserPipe(LoginUserPipeSchema))
    async login(@Body() user: LoginUserDto): Promise<ResultData> {
        return this.usersService.login(user)
    }

    @Post('/register')
    @ApiOperation({ summary: '注册' })
    @ApiBody({ type: CreateUserDto })
    @ApiResult(UserEntity)
    @AllowAnon()
    @UsePipes(new CreateUserPipe(CreateUserPipeSchema))
    async create(@Body() user: CreateUserDto): Promise<ResultData> {
        return this.usersService.create(user)
    }

    @Post('/refresh')
    @ApiOperation({ summary: '刷新 token' })
    @ApiBody({ type: RefreshTokenDto })
    @AllowAnon()
    async refresh(@Body('refreshToken') refreshToken: string): Promise<ResultData> {
        return this.usersService.refreshToken(refreshToken)
    }
}
