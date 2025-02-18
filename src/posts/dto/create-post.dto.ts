import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsEnum(['text', 'image', 'video'])
    @IsOptional()
    type: 'text' | 'image' | 'video' = 'text'; // Definindo um valor default como 'text'
}
