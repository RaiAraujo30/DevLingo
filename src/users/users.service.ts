import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Para hash de senhas

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Criação de um novo usuário
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação da entidade
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
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
