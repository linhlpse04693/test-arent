import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  energy: number;
}
