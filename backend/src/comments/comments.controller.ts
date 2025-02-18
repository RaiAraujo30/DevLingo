import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { Request } from 'express';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/entities/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService, // Para buscar o post associado
  ) {}

  // Criar um comentário para um post específico (rota protegida)
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: Request & { user: User },
  ) {
    const post = await this.postsService.findOne(postId);
    return this.commentsService.create(createCommentDto, post, request.user);
  }

  // Listar todos os comentários de um post
  @Get('post/:postId')
  async findAllByPost(@Param('postId') postId: string) {
    return this.commentsService.findAllByPost(postId);
  }

  // Buscar um comentário específico
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  // Atualizar um comentário (rota protegida)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  // Remover um comentário (rota protegida)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commentsService.remove(id);
    return { message: 'Comentário removido com sucesso.' };
  }
}
