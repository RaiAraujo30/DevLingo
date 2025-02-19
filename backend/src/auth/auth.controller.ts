import { Controller, Post, Get, Body, UseGuards, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtAuthGuard } from './jwtAuthGuard';
import { AuthUserRequest } from './types/auth-user-request.interface';
import { Public } from '../decorators/public.decorator';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  


  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request: Request & { headers: { authorization?: string } }) {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token não encontrado');

    await this.authService.logout(token);
    return { message: 'Logout realizado com sucesso' };
  }
}
