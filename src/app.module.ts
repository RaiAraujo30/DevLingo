import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProblemsModule } from './problems/problems.module';
import { UserProgressModule } from './user_progress/user_progress.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ChallengesModule } from './challenges/challenges.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DatabaseModule } from './config/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwtAuthGuard';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule, ProblemsModule, UserProgressModule, PostsModule, CommentsModule, ChallengesModule, NotificationsModule, DatabaseModule, AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Depois, verifica se o usuário tem a role necessária
    },
  ],
  
})
export class AppModule {}
