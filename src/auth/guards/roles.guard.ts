import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "../../prisma/prisma.service";
import { Role } from "@prisma/client"

@Injectable()

export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()])
        // console.log(requiredRoles)
        if (!requiredRoles) {
            return true
        }

        const ctx = context.switchToHttp().getRequest<any>();

        // console.log(ctx.user.email)

        const userInfo = await this.prisma.user.findUnique({
            where: {
                email: ctx.user.email
            }
        })


        return requiredRoles.some((role: Role) => userInfo.role.includes(role))

    }
}