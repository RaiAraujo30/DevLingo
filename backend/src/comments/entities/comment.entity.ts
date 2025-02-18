import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";

@Entity('comments')
export class Comment {
  // Identificador único
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relação com o usuário que comentou
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relação com o post que recebeu o comentário
  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  // Conteúdo do comentário
  @Column({ type: 'text' })
  content: string;

  // Data de criação
  @CreateDateColumn()
  created_at: Date;

  // Data de atualização
  @UpdateDateColumn()
  updated_at: Date;
}
