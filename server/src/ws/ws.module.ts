import { Module, forwardRef } from '@nestjs/common'
import { WsService } from './ws.service'
import { WsGateway } from './ws.gateway'
import { UsersModule } from '../system/users/users.module'

@Module({
    imports: [
        forwardRef(() => UsersModule) // 模块间循环依赖处理
    ],
    providers: [WsGateway, WsService]
})
export class WsModule {}
