import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './entities/category.entity'
import { UserEntity } from '../users/entities/user.entity'
import { DocEntity } from '../doc/entities/doc.entity'

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, UserEntity, DocEntity])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}
