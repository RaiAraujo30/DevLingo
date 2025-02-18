import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProblemsModule } from 'src/problems/problems.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthModule, ProblemsModule],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
