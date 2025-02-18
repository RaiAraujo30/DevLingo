import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../users/entities/user.entity';
import { RevokedToken } from './entities/revoked-token.entity';
import { JwtAuthGuard } from './jwtAuthGuard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RevokedToken]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'segredo123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // 🔥 Agora incluímos JwtAuthGuard
  exports: [AuthService, JwtStrategy, JwtAuthGuard], // 🔥 Exportamos para ser acessado em outros módulos
})
export class AuthModule {}
