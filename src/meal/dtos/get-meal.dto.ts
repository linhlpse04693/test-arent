import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMealDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;
}
