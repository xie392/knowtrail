import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { ApiResult } from '../../common/decorators/api-result.decorator'
import { AllowAnon } from '../../common/decorators/allow-anon.decorator'

import {
    ApiTags,
    ApiOperation,
    ApiBody,
    ApiConsumes,
    ApiQuery,
    ApiBearerAuth
} from '@nestjs/swagger'

import { ResultData } from '../../common/utils/result'

import { LoginUserDto } from './dto/login-user.dto'
import { UserEntity } from './entities/user.entity'

// import { LoginPipe, LoginPipeSchema } from './pipe/login-user.pipe'

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto)
    // }

    // @Get()
    // findAll() {
    //     return this.usersService.findAll()
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.usersService.findOne(+id)
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id)
    // }
}
