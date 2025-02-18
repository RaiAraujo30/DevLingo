import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Para hash de senhas
import { UserRole } from './types/User.role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Criação de um novo usuário
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, role } = createUserDto;

    // Verifica se o email já está em uso
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const validRole = Object.values(UserRole).includes(role) ? role : UserRole.USER;

    // Criação da entidade
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: validRole,
    });

    // Salva no banco de dados
    return this.userRepository.save(user);
  }

  // Buscar usuário por ID (exemplo básico)
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]>{
    return this.userRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
