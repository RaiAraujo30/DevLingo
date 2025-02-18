import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Comment {
  //uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //user_id
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  //post_id
  @ManyToOne(() => Post, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  //content
  @Column({ type: 'text' })
  content: string;

  //created_at
  @CreateDateColumn()
  created_at: Date;

  //updated_at
  @UpdateDateColumn()
  updated_at: Date;
}
