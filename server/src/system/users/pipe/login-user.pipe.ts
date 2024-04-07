import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import * as joi from 'joi'
import { LoginUserDto } from '../dto/login-user.dto'

@Injectable()
export class LoginUserPipe implements PipeTransform {
    constructor(private readonly schema: joi.ObjectSchema) {}

    transform(value: LoginUserDto) {
        const { error } = this.schema.validate(value)

        if (error) {
            throw new BadRequestException('验证失败: 缺少内容！')
        }
        return value
    }
}

export const LoginUserPipeSchema = joi.object({
    account: joi.string().required(),
    password: joi.string().required()
})
