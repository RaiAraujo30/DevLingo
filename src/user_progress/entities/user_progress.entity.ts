import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { User } from 'src/users/entities/user.entity';
  import { Problem } from 'src/problems/entities/problem.entity';
  
  @Entity('user_progress')
  export class UserProgress {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Problem, (problem) => problem.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'problem_id' })
    problem: Problem;
  
    @Column({ type: 'enum', enum: ['resolved', 'attempted', 'in_progress'], default: 'in_progress' })
    status: 'resolved' | 'attempted' | 'in_progress';
  
    @Column({ type: 'text', nullable: true })
    code_submitted?: string;
  
    @Column({ type: 'float', nullable: true })
    execution_time?: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  