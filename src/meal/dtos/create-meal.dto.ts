import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MealType } from '../../database/entities/meal.entity';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  type: MealType;

  @IsOptional()
  image: string;

  @IsOptional()
  userId: string;
}
