import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteUser(requestingUserId: string, targetUserId: string, requestingUserRole: string): Promise<void> {
    const userToDelete = await this.userRepository.findOne({ where: { id: targetUserId } });

    if (!userToDelete) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Somente o próprio usuário ou um admin pode excluir
    if (requestingUserId !== targetUserId && requestingUserRole !== 'admin') {
      throw new ForbiddenException('Você não tem permissão para excluir este usuário');
    }

    await this.userRepository.remove(userToDelete);
  }

  async followUser(currentUserId: string, targetUserId: string): Promise<void> {
    if (currentUserId === targetUserId) {
      throw new Error("Você não pode seguir a si mesmo.");
    }
    
    const currentUser = await this.userRepository.findOne({ 
      where: { id: currentUserId }, 
      relations: ['following'] 
    });
    const targetUser = await this.userRepository.findOne({ where: { id: targetUserId } });
    
    if (!currentUser || !targetUser) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    
    // Se já estiver seguindo, pode lançar um erro ou simplesmente retornar
    if (currentUser.following.some(user => user.id === targetUserId)) {
      return;
    }
    
    currentUser.following.push(targetUser);
    await this.userRepository.save(currentUser);
  }

  async unfollowUser(currentUserId: string, targetUserId: string): Promise<void> {
    const currentUser = await this.userRepository.findOne({ 
      where: { id: currentUserId }, 
      relations: ['following'] 
    });
    
    if (!currentUser) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    
    currentUser.following = currentUser.following.filter(user => user.id !== targetUserId);
    await this.userRepository.save(currentUser);
  }

  async getFollowers(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['followers'] });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    return user.followers;
  }

  async getFollowing(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['following'] });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }
    return user.following;
  }
}
