import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  userId: string;
}
