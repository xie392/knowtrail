import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
// import { RedisClientOptions } from '@liaoliaots/nestjs-redis'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import configuration from './config/index'
// import { RedisModule } from './common/lib/redis/redis.module'
import { JwtAuthGuard } from './tool/auth/auth.guard'
import { AuthModule } from './tool/auth/auth.module'
import { UsersModule } from './system/users/users.module'
import { DocModule } from './system/doc/doc.module'
import { CategoryModule } from './system/category/category.module'
import { EmailModule } from './tool/email/email.module'
import { UploadModule } from './upload/upload.module'

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
        // 静态资源
        // 访问地址： http://localhost:3000/upload/
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'upload') // 设置上传目录的路径
            // exclude: ['/api/(.*)']
        }),

        // libs redis
        // RedisModule.forRootAsync(
        //     {
        //         imports: [ConfigModule],
        //         inject: [ConfigService],
        //         useFactory: (config: ConfigService) => {
        //             return {
        //                 closeClient: true,
        //                 readyLog: true,
        //                 errorLog: true,
        //                 config: config.get<RedisClientOptions>('redis')
        //             }
        //         }
        //     },
        //     true
        // ),
        AuthModule,
        UsersModule,
        DocModule,
        CategoryModule,
        EmailModule,
        UploadModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
    // controllers: [UploadController]
})
export class AppModule {}
