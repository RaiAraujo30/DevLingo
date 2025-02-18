import { Module } from '@nestjs/common';
import { UserProgressService } from './user_progress.service';
import { UserProgressController } from './user_progress.controller';
import { UsersModule } from 'src/users/users.module';
import { ProblemsModule } from 'src/problems/problems.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entities/user.entity';
import { UserProgress } from './entities/user_progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProgress, User, Problem]),
    ProblemsModule, 
  ],
  controllers: [UserProgressController],
  providers: [UserProgressService],
  exports: [TypeOrmModule],
})
export class UserProgressModule {}