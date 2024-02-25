import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
// import { EmailController } from './email.controller'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import * as path from 'path'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    ...config.get('email'),
                    template: {
                        dir: path.join(process.cwd(), './src/tool/email/template'),
                        adapter: new EjsAdapter(),
                        options: {
                            strict: true
                        }
                    }
                }
            }
        })
    ],
    // EmailController
    controllers: [],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule {}
