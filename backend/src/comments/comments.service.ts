import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, post: Post, user: User): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      post,
      user,
    });

    const comments = await this.commentRepository.find({ where: { post: { id: 'bcb24286-e3ca-4cb7-b803-1eadc2859321' } } });
console.log('Comentários encontrados:', comments);


    await this.commentRepository.save(comment);

    // Increment the comments_count property of the post
    post.comments_count += 1;
    await this.commentRepository.manager.save(post);

    return comment;
  }

  async findAllByPost(postId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user', 'post'],
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
    if (!comment) {
      throw new NotFoundException(`Comentário com id ${id} não encontrado.`);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update(id, updateCommentDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comentário com id ${id} não encontrado.`);
    }
  }
}
