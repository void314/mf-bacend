import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext):  boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (requiredRoles.length == 0) {
                return true;
            }

            const request = context.switchToHttp().getRequest();
            const user = request.user;
            const roles = user.roles;
            
            return roles.some(role => requiredRoles.includes(role.value));

        } catch (e) {
            throw new HttpException('User does not have access', HttpStatus.FORBIDDEN);
        }
    }
}