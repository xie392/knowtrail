import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import configuration from './config/index'

import { JwtAuthGuard } from './tool/auth/auth.guard'
import { AuthModule } from './tool/auth/auth.module'
import { UsersModule } from './system/users/users.module'
import { DocModule } from './system/doc/doc.module'
import { CategoryModule } from './system/category/category.module'
import { EmailModule } from './tool/email/email.module'

@Module({
    imports: [
        // 配置模块
        ConfigModule.forRoot({
            cache: true,
            load: [configuration],
            isGlobal: true
        }),
        // mysql 配置
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'mysql',
                    // 自动加载实体
                    autoLoadEntities: true,
                    // 应用程序关闭时连接不会关闭。
                    keepConnectionAlive: true,
                    ...config.get('db.mysql')
                } as TypeOrmModuleOptions
            }
        }),
        AuthModule,
        UsersModule,
        DocModule,
        CategoryModule,
        EmailModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
})
export class AppModule {}
