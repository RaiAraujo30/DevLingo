import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(['text', 'image', 'video'])
  @IsOptional()
  type: 'text' | 'image' | 'video' = 'text'; // Definindo um valor default como 'text'

  @IsOptional()
  @IsUUID()
  problemId?: string;
}
