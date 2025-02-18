import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtAuthGuard } from './jwtAuthGuard';
import { AuthUserRequest } from './interfaces/auth-user-request.interface';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  getCurrentUser(@Req() request: AuthUserRequest) {
    return {
      userId: request.user.userId,
      username: request.user.username,
      role: request.user.role, 
    };
  }
}
