import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entities/user.entity';
import { ProblemsService } from 'src/problems/problems.service';
import { Problem } from 'src/problems/entities/problem.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly problemsService: ProblemsService,
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    let problem: Problem | null = null;
    if (createPostDto.problemId) {
      problem = await this.problemsService.findOne(createPostDto.problemId);
      if (!problem) {
        throw new NotFoundException(`Problem com id ${createPostDto.problemId} não encontrado.`);
      }
    }
    const post = this.postsRepository.create({
      ...createPostDto,
      user,
      problem, // Pode ser nulo se não enviado
      type: createPostDto.type || 'text', // Valor default 'text'
    });
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user', 'problem'],
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'problem', 'comments'],
    });
    if (!post) {
      throw new NotFoundException(`Post com id ${id} não encontrado.`);
    }
    return post;
  }

  async findByUser(userId: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'problem'],
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    if (updatePostDto.problemId) {
      const problem = await this.problemsService.findOne(updatePostDto.problemId);
      if (!problem) {
        throw new NotFoundException(`Problem com id ${updatePostDto.problemId} não encontrado.`);
      }
      // Inclua o problem na atualização
      updatePostDto = { ...updatePostDto, problemId: undefined }; // Remover problemId do DTO
      await this.postsRepository.update(id, { ...updatePostDto, problem });
    } else {
      await this.postsRepository.update(id, updatePostDto);
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post com id ${id} não encontrado.`);
    }
  }
}
