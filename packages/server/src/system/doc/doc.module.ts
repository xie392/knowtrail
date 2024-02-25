import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DocService } from './doc.service'
import { DocController } from './doc.controller'

import { DocEntity } from './entities/doc.entity'
import { CategoryEntity } from '../category/entities/category.entity'
import { UserEntity } from '../users/entities/user.entity'
@Module({
    imports: [TypeOrmModule.forFeature([DocEntity, UserEntity, CategoryEntity])],
    controllers: [DocController],
    providers: [DocService]
})
export class DocModule {}
