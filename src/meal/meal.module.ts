import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealEntity } from '../database/entities/meal.entity';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MealEntity])],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule {}
