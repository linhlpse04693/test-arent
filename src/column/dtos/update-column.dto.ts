import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MealType } from '../../database/entities/meal.entity';

export class UpdateColumnDto {
  @IsNotEmpty()
  @IsString()
  type: MealType;

  @IsOptional()
  image: string;
}
