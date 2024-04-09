import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Req } from '@nestjs/common'
import { UsersService } from './users.service'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'

// import { ApiResult } from '../../common/decorators/api-result.decorator'
// import { AllowAnon } from '../../common/decorators/allow-anon.decorator'

import {
    ApiTags
    // ApiOperation,
    // ApiBody,
    // ApiConsumes,
    // ApiQuery,
    // ApiBearerAuth
} from '@nestjs/swagger'

// import { ResultData } from '../../common/utils/result'

// import { LoginUserDto } from './dto/login-user.dto'
// import { UserEntity } from './entities/user.entity'

// import { LoginPipe, LoginPipeSchema } from './pipe/login-user.pipe'

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Req() req) {
        console.log('user', req.user)
        return '11'
    }
}
