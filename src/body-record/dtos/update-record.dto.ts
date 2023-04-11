import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateRecordDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  fat: number;
}
