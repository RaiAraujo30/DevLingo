import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('posts')
export class Post {
  // Identificador único
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relação com o usuário que criou o post
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Conteúdo do post
  @Column({ type: 'text' })
  content: string;

  // Tipo do post: 'text', 'image' ou 'video'
  @Column({ type: 'enum', enum: ['text', 'image', 'video'] })
  type: 'text' | 'image' | 'video';

  // Contador de likes
  @Column({ type: 'int', default: 0 })
  likes_count: number;

  // Contador de comentários
  @Column({ type: 'int', default: 0 })
  comments_count: number;

  // Data de criação
  @CreateDateColumn()
  created_at: Date;

  // Data de atualização
  @UpdateDateColumn()
  updated_at: Date;
}
