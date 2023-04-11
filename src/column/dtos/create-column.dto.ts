import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  hashtag: string;

  @IsOptional()
  thumbnail: string;

  @IsOptional()
  userId: string;
}
