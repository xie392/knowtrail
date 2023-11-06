import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { UsersModule } from './system/users/users.module'
import { MessageModule } from './system/message/message.module'

import configuration from './config/index'

import { RedisClientOptions } from '@liaoliaots/nestjs-redis'
import { RedisModule } from './common/lib/redis/redis.module'

import { JwtAuthGuard } from './common/guards/auth.guard'

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
        // libs redis
        RedisModule.forRootAsync(
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (config: ConfigService) => {
                    return {
                        closeClient: true,
                        readyLog: true,
                        errorLog: true,
                        config: config.get<RedisClientOptions>('redis')
                    }
                }
            },
            true
        ),
        UsersModule,
        MessageModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
})
export class AppModule {}
