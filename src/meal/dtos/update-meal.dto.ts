import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MealType } from '../../database/entities/meal.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMealDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: MealType;

  @IsOptional()
  image: string;
}
