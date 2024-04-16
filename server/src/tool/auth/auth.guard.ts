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
        const req = ctx.switchToHttp().getRequest()
        const accessToken = req.get('Authorization')
        // 在接口允许不需要 token 且没有携带 token 时，直接返回
        if (allowAnon && !accessToken) return true
        // 如果不在白名单内且没有 token，直接抛出
        if (!allowAnon && !accessToken) throw new ForbiddenException('请先登录')
        // 验证 token , 查看是否过期
        const atUserId = this.userService.verifyToken(accessToken)
        // 在没有验证成功且是不在白名单内的直接抛出
        if (!allowAnon && !atUserId) throw new UnauthorizedException('当前登录已过期，请重新登录')
        return this.activate(ctx)
    }

    async activate(ctx: ExecutionContext): Promise<boolean> {
        return super.canActivate(ctx) as Promise<boolean>
    }
}
