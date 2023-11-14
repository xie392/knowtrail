import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

import rateLimit from 'express-rate-limit'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { mw as requestIpMw } from 'request-ip'

import * as express from 'express'
import * as path from 'path'

import { logger } from './common/lib/log4js/logger.middleware'
import { Logger } from './common/lib/log4js/log4j.util'
import { TransformInterceptor } from './common/lib/log4js/transform.interceptor'
import { HttpExceptionsFilter } from './common/lib/log4js/http-exceptions-filter'
import { ExceptionsFilter } from './common/lib/log4js/exceptions-filter'

import * as Chalk from 'chalk'
import * as session from 'express-session'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    })

    // 设置访问频率
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15分钟
            max: 1000 // 限制15分钟内最多只能访问1000次
        })
    )

    const config = app.get(ConfigService)

    const prefix = config.get<string>('app.prefix')

    // 设置 api 访问前缀
    app.setGlobalPrefix(prefix)

    // web 安全，防常见漏洞
    // 注意： 开发环境如果开启 nest static module 需要将 crossOriginResourcePolicy 设置为 false 否则 静态资源 跨域不可访问
    app.use(
        helmet({
            crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
            crossOriginResourcePolicy: false
        })
    )

    const swaggerOptions = new DocumentBuilder()
        .setTitle('知迹')
        .setDescription('知迹接口文档')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)

    SwaggerModule.setup(`${prefix}/docs`, app, document, {
        swaggerOptions: {
            persistAuthorization: true
        },
        customSiteTitle: '知迹 API 文档'
    })

    // 获取真实 ip
    app.use(requestIpMw({ attributeName: 'ip' }))

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(
        session({ secret: 'XiaoMan', name: 'xm.session', rolling: true, cookie: { maxAge: null } })
    )

    app.use(logger)
    // 使用全局拦截器打印出参
    app.useGlobalInterceptors(new TransformInterceptor())
    // 所有异常
    app.useGlobalFilters(new ExceptionsFilter())
    app.useGlobalFilters(new HttpExceptionsFilter())

    // 获取配置端口
    const port = config.get<number>('app.port') || 8080
    await app.listen(port)

    // 文件上传
    const fileUploadLocationConfig = config.get<string>('app.file.location') || '../upload'
    const fileUploadBastPath = path.normalize(
        path.isAbsolute(fileUploadLocationConfig)
            ? `${fileUploadLocationConfig}`
            : path.join(process.cwd(), `${fileUploadLocationConfig}`)
    )

    Logger.log(
        Chalk.blue(
            `=====================================服务启动成功===================================== `
        ),
        '\n',
        Chalk.green('上传文件存储路径'),
        `        ${fileUploadBastPath}`,
        '\n',
        Chalk.green('服务地址'),
        `                http://localhost:${port}${prefix}/`,
        '\n',
        Chalk.green('swagger 文档地址        '),
        `http://localhost:${port}${prefix}/docs/`
    )
}
bootstrap()
