import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // access logic
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    // const { user } = context.switchToHttp().getRequest();
    const user: User = {
      name: 'Marius',
      roles: [Role.ADMIN],
    };

    return requireRoles.some((role) => user.roles.includes(role));
  }
}
