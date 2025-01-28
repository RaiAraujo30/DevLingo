import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';
  
  @Entity('users') 
  export class User {
    @PrimaryGeneratedColumn('uuid') 
    id: string;
  
    @Column({ type: 'varchar', unique: true, length: 50 })
    username: string;
  
    @Column({ type: 'varchar', unique: true, length: 100 })
    email: string;
  
    @Column({ type: 'varchar' }) 
    password: string;
  
    @Column({ type: 'varchar', nullable: true }) 
    profile_picture?: string;
  
    @Column({ type: 'text', nullable: true }) 
    bio?: string;
  
    @CreateDateColumn() 
    created_at: Date;
  
    @UpdateDateColumn() // Atualiza automaticamente ao alterar
    updated_at: Date;
  }
  