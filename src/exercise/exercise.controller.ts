import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { Ability } from '../casl/ability';
import { Action } from '../casl/action';
import { DeleteResult } from 'typeorm';
import { ExerciseEntity } from '../database/entities/exercise.entity';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { UpdateExerciseDto } from './dtos/update-exercise.dto';
import { ExerciseAbility } from '../casl/decorators/exercise-ability.decorator';
import { GetExerciseDto } from './dtos/get-exercise.dto';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  async getList(
    @User() user: UserEntity,
    @Query() filter: GetExerciseDto,
    @ExerciseAbility() ability: Ability<ExerciseEntity>,
  ): Promise<ExerciseEntity[]> {
    ability.can(Action.ReadList, ExerciseEntity);

    return await this.exerciseService.getList(user.id, filter);
  }

  @Post()
  async create(
    @User() user: UserEntity,
    @Body() payload: CreateExerciseDto,
    @ExerciseAbility() ability: Ability<ExerciseEntity>,
  ): Promise<ExerciseEntity> {
    payload.userId = user.id;
    ability.can(Action.Create, ExerciseEntity);

    return await this.exerciseService.create(payload);
  }

  @Get(':id')
  async getDetail(
    @User() user: UserEntity,
    @Param('id') id: string,
    @ExerciseAbility() ability: Ability<ExerciseEntity>,
  ): Promise<ExerciseEntity> {
    const exercise = await this.exerciseService.getDetail(id);
    ability.can(Action.Read, exercise);

    return exercise;
  }

  @Put(':id')
  async update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() payload: UpdateExerciseDto,
    @ExerciseAbility() ability: Ability<ExerciseEntity>,
  ): Promise<ExerciseEntity> {
    const exercise = await this.exerciseService.getDetail(id);
    ability.can(Action.Update, exercise);

    return await this.exerciseService.update({ ...exercise, ...payload });
  }

  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: string,
    @ExerciseAbility() ability: Ability<ExerciseEntity>,
  ): Promise<DeleteResult> {
    const exercise = await this.exerciseService.getDetail(id);
    ability.can(Action.Delete, exercise);

    return await this.exerciseService.delete(id);
  }
}
