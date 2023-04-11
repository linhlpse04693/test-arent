import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  fat: number;

  @IsOptional()
  userId: string;
}
