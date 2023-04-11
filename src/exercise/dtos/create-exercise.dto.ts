import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  energy: number;

  @IsOptional()
  userId: string;
}
