import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Req } from '@nestjs/common'
import { UsersService } from './users.service'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'

// import { ApiResult } from '../../common/decorators/api-result.decorator'
// import { AllowAnon } from '../../common/decorators/allow-anon.decorator'

import {
    ApiOperation,
    ApiTags
    // ApiOperation,
    // ApiBody,
    // ApiConsumes,
    // ApiQuery,
    // ApiBearerAuth
} from '@nestjs/swagger'
import { ApiResult } from '../../common/decorators/api-result.decorator'
import { AllowAnon } from '../../common/decorators/allow-anon.decorator'
import { UserEntity } from './entities/user.entity'

// import { ResultData } from '../../common/utils/result'

// import { LoginUserDto } from './dto/login-user.dto'
// import { UserEntity } from './entities/user.entity'

// import { LoginPipe, LoginPipeSchema } from './pipe/login-user.pipe'

@ApiTags('用户管理')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    @ApiOperation({ summary: '查询用户信息' })
    @ApiResult(UserEntity)
    @AllowAnon()
    async findOneById(@Param('id') id: string) {
        return await this.usersService.findOneById(id)
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新用户信息' })
    async updateUserInfo(@Body() updateUserDto: any, @Param('id') id: string) {
        return await this.usersService.updateUserInfo(updateUserDto, id)
    }
}
