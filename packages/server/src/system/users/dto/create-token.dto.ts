import { ApiProperty } from '@nestjs/swagger'

export class CreateTokenDto {
    @ApiProperty({ description: 'token' })
    readonly accessToken: string

    @ApiProperty({ description: '刷新 token' })
    readonly refreshToken: string
}
