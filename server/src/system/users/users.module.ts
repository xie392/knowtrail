import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersService } from './users.service'

import { UsersController } from './users.controller'
import { BaseController } from './base.controller'

import { UserEntity } from './entities/user.entity'
// import { UserLoginHistoryEntity } from './entities/user-login-history.entity'

import { AuthModule } from '../auth/auth.module'

import { JwtConfig } from '../../common/utils/jwt'
import { JwtImplService } from '../../common/utils/jwt'


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
        JwtModule.registerAsync(JwtConfig)
    ],
    controllers: [UsersController, BaseController],
    providers: [UsersService,JwtImplService],
    exports: [UsersService]
})
export class UsersModule {}
