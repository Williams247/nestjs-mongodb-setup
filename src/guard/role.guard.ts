import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../utils/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    const { user } = context
      .switchToHttp()
      .getRequest<{ user: { id: string; role: Role } }>();

    if (!user) {
      return false; // No user, deny access
    }

    if (requiredRoles[0] !== user.role) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        success: false,
        message: 'Forbidden',
      });
    }

    return true;
  }
}
