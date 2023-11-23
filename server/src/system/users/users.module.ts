import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersService } from './users.service'

import { UsersController } from './users.controller'
import { BaseController } from './base.controller'

import { UserEntity } from './entities/user.entity'

import { AuthModule } from '../../tool/auth/auth.module'
import { EmailModule } from 'src/tool/email/email.module'
import { CategoryModule } from '../category/category.module'

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
        }),
        forwardRef(() => EmailModule),
        forwardRef(() => CategoryModule)
    ],
    controllers: [UsersController, BaseController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
