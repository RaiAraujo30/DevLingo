import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Criação de um novo post (requer autenticação)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() request: Request & { user: User }) {
    const user = request.user;
    return this.postsService.create(createPostDto, user);
  }

  // Listar todos os posts (pública)
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  // Buscar um post específico (pública)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // Atualizar um post (requer autenticação)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  // Excluir um post (requer autenticação)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return { message: 'Post removido com sucesso.' };
  }
}
