import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import * as joi from 'joi'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class CreateUserPipe implements PipeTransform {
    constructor(private readonly schema: joi.ObjectSchema) {}

    transform(value: CreateUserDto) {
        const { error } = this.schema.validate(value)

        if (error) {
            throw new BadRequestException('验证失败: 缺少内容！')
        }
        return value
    }
}

export const CreateUserPipeSchema = joi.object({
    account: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    captcha: joi.string().length(6).required()
})
