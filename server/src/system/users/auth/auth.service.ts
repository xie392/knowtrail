import { Inject, Injectable } from '@nestjs/common'

import { UserEntity } from '../entities/user.entity'
import { UsersService } from '../users.service'

@Injectable()
export class AuthService {
    constructor(
        @Inject(UsersService)
        private readonly UserService: UsersService
    ) {}

    // async validateUser(payload: { id: string }): Promise<UserEntity> {
    //     console.log('validateUser', payload)
    //     return await this.UserService.findOneById(payload.id)
    // }
}
