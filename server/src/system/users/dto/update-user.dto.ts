import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ description: '用户头像' })
    readonly avatar?: string

    @ApiProperty({ description: '用户名' })
    readonly nick_name?: string
}
