import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DocService } from './doc.service'
import { DocController } from './doc.controller'

import { DocEntity } from './entities/doc.entity'
import { CategoryEntity } from '../category/entities/category.entity'
import { UserEntity } from '../users/entities/user.entity'

import { JwtModule } from '@nestjs/jwt'
import { JwtConfig } from '../../common/utils/jwt'
import { JwtImplService } from '../../common/utils/jwt'

@Module({
    imports: [
        TypeOrmModule.forFeature([DocEntity, UserEntity, CategoryEntity]),
        JwtModule.registerAsync(JwtConfig)
    ],
    controllers: [DocController],
    providers: [DocService, JwtImplService]
})
export class DocModule {}
