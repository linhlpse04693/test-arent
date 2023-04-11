import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MealType } from '../../database/entities/meal.entity';

export class UpdateMealDto {
  @IsNotEmpty()
  @IsString()
  type: MealType;

  @IsOptional()
  image: string;
}
