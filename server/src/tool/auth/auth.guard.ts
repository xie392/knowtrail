import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import {
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { ALLOW_ANON } from '../../common/decorators/allow-anon.decorator'
import { UsersService } from '../../system/users/users.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
        @Inject(UsersService)
        private readonly userService: UsersService
    ) {
        super()
    }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        // 函数，类 是否允许 无 token 访问
        const allowAnon = this.reflector.getAllAndOverride<boolean>(ALLOW_ANON, [
            ctx.getHandler(),
            ctx.getClass()
        ])
        if (allowAnon) return true
        const req = ctx.switchToHttp().getRequest()
        const accessToken = req.get('Authorization')
        if (!accessToken) throw new ForbiddenException('请先登录')
        // 验证 token , 查看是否过期
        const atUserId = this.userService.verifyToken(accessToken)
        // console.log('userId', atUserId, accessToken)
        // 全局变量
        if (!atUserId) throw new UnauthorizedException('当前登录已过期，请重新登录')
        return this.activate(ctx)
    }

    async activate(ctx: ExecutionContext): Promise<boolean> {
        return super.canActivate(ctx) as Promise<boolean>
    }
}
