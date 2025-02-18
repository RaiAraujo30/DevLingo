import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/public.decorator';
import { UserRole } from 'src/users/types/User.role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Se a rota não exige roles, qualquer usuário pode acessar.
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Pegamos o usuário do token JWT

    if (!user) {
      throw new ForbiddenException('Acesso negado: Usuário não autenticado');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Acesso negado: Requer permissão ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}
