import { Module, forwardRef } from '@nestjs/common'
import { WsService } from './ws.service'
import { WsGateway } from './ws.gateway'
import { UsersModule } from '../system/users/users.module'
import { DocService } from 'src/system/doc/doc.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DocEntity } from '../system/doc/entities/doc.entity'

@Module({
    imports: [
        forwardRef(() => UsersModule), // 模块间循环依赖处理
        TypeOrmModule.forFeature([DocEntity])
    ],
    providers: [WsGateway, WsService, DocService]
})
export class WsModule {}
