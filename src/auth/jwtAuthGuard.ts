import { Injectable, ExecutionContext, UnauthorizedException, Inject, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Optional() @Inject(AuthService) private readonly authService?: AuthService // 🔥 Agora é opcional
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Token não fornecido');

    const token = authHeader.split(' ')[1];
    console.log('Token recebido no JwtAuthGuard:', request.headers.authorization);

    // 🔥 Se AuthService não estiver injetado, lançar erro
    if (!this.authService) {
      console.error('⚠️ AuthService não foi injetado corretamente no JwtAuthGuard');
      throw new UnauthorizedException('Erro interno: AuthService não foi inicializado.');
    }

    if (await this.authService.isTokenRevoked(token)) {
      throw new UnauthorizedException('Token revogado. Faça login novamente.');
    }

    const canActivateResult = super.canActivate(context);
    return canActivateResult instanceof Promise
        ? await canActivateResult
        : await lastValueFrom(canActivateResult as Observable<boolean>);
  }
}
