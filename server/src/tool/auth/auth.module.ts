import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from '../../system/users/users.module'

import { AuthService } from './auth.service'
import { AuthStrategy } from './auth.strategy'

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => UsersModule) // 模块间循环依赖处理
    ],
    providers: [AuthService, AuthStrategy],
    exports: [PassportModule, AuthService]
})
export class AuthModule {}
