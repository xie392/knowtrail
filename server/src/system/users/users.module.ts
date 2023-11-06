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

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                secret: config.get('jwt.secretkey'),
                signOptions: {
                    expiresIn: config.get('jwt.expiresin')
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [UsersController, BaseController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
