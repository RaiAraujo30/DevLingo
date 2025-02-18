import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateProblemDto {
  @IsInt()
  leetcode_id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsUrl()
  url: string;
}
