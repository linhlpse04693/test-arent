import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from '../database/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity])],
  providers: [ExerciseService],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
