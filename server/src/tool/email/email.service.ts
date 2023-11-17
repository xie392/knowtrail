import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { SednMailDto } from './dto/send-mail.dto'

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    /**
     * 发送邮件验证码
     * @param data 邮件主体信息
     */
    async sendMail(data: SednMailDto) {
        try {
            const sendMailOptions: ISendMailOptions = {
                to: data.email,
                subject: data.subject || '用户邮箱验证',
                template: 'validate.code.ejs',
                context: {
                    code: data.captcha,
                    date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    sign: data.sign || '系统邮件,请勿回复。'
                }
            }
            const result = await this.mailerService.sendMail(sendMailOptions)
            // console.log('result', result)
            
            if (result) return true
            return false
        } catch (error) {
            console.log('邮箱发送失败：', error)
            return false
        }
    }
}
