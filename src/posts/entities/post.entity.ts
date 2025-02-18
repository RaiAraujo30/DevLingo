import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Post {

    //uuid
    @PrimaryGeneratedColumn('uuid')
    id: string

    //user_id
    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    //content
    @Column({ type: 'text' })
    content: string;

    //type -> enum
    @Column({ type: 'enum', enum: ['text', 'image', 'video'] })
    type: 'text' | 'image' | 'video';

    //likes_count
    @Column({ type: 'int', default: 0 })
    likes_count: number;

    //comments_count
    @Column({ type: 'int', default: 0 })
    comments_count: number;

    //created_at
    @CreateDateColumn()
    created_at: Date;
    //updated_at
    @UpdateDateColumn()
    updated_at: Date;
}
