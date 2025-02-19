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
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // URL base para acessar os arquivos, opcional
    }),
    AuthModule, // 🔥 Certifique-se de que `AuthModule` vem antes dos Guards globais
    UsersModule, 
    ProblemsModule, 
    UserProgressModule, 
    PostsModule, 
    CommentsModule, 
    ChallengesModule, 
    NotificationsModule, 
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService], // 🔥 Removemos `APP_GUARD`
})
export class AppModule {}
