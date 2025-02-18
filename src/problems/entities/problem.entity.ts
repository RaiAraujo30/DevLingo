import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('problems')
export class Problem {

    //uuid
    @PrimaryGeneratedColumn('uuid')
    id: string;
    //leetcode_id
    @Column({ type: 'int', unique: true })
    leetcode_id: number;
    
    //title
    @Column({ type: 'varchar', length: 100 })
    title: string;

    //description
    @Column( { type: 'text' })
    description: string;

    //difficulty
    @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'] })
    difficulty: 'easy' | 'medium' | 'hard';
    
    //tags
    @Column({ type: 'text', array: true })
    tags: string[];

    //url
    @Column({ type: 'varchar' })
    url: string;

    //created_at
    @CreateDateColumn()
    created_at: Date;

    //updated_at
    @UpdateDateColumn()
    updated_at: Date;
}
