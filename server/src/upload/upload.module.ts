import { Module } from '@nestjs/common'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { UserEntity } from 'src/system/users/entities/user.entity'

@Module({
    // imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule {}
