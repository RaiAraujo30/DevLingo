import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { Problem } from 'src/problems/entities/problem.entity';
import { UserProgress } from 'src/user_progress/entities/user_progress.entity';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Post } from 'src/posts/entities/post.entity';
import { RevokedToken } from 'src/auth/entities/revoked-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite usar o ConfigService globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'devlingo'),
        entities: [User, UserProgress, Problem, Challenge, Comment, Notification, Post, RevokedToken], // Carrega as entidades automaticamente
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true), // Apenas para desenvolvimento
        logging: configService.get<boolean>('DB_LOGGING', false),
        ssl: {
          rejectUnauthorized: false, 
        },
        migrations: ['src/migrations/*.ts'],
      }),
    }),
  ],
})
export class DatabaseModule {}
