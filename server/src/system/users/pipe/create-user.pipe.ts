import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import * as joi from 'joi'
import { CreateUserDto } from '../dto/create-user.dto'
import { ErrorMessage } from '../../../common/utils/constants'

@Injectable()
export class CreateUserPipe implements PipeTransform {
    constructor(private readonly schema: joi.ObjectSchema) {}

    transform(value: CreateUserDto) {
        const { error } = this.schema.validate(value)

        if (error) {
            throw new BadRequestException('ValidationError: ' + ErrorMessage.NoContent)
        }
        return value
    }
}

export const CreateUserPipeSchema = joi.object({
    account: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
})
