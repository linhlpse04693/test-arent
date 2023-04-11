import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { Ability } from '../casl/ability';
import { Action } from '../casl/action';
import { DeleteResult } from 'typeorm';
import { MealService } from './meal.service';
import { MealEntity } from '../database/entities/meal.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMealDto } from './dtos/create-meal.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MealAbility } from '../casl/decorators/meal-ability.decorator';
import { UpdateMealDto } from './dtos/update-meal.dto';
import { GetMealDto } from './dtos/get-meal.dto';

export const storage = {
  storage: diskStorage({
    destination: './public/meals-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('meals')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  async getList(
    @User() user: UserEntity,
    @Query() filter: GetMealDto,
    @MealAbility() ability: Ability<MealEntity>,
  ): Promise<MealEntity[]> {
    ability.can(Action.ReadList, MealEntity);

    return await this.mealService.getList(user.id, filter);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  async create(
    @User() user: UserEntity,
    @Body() payload: CreateMealDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @MealAbility()
    ability: Ability<MealEntity>,
  ): Promise<MealEntity> {
    payload.userId = user.id;
    payload.image = file.path;
    ability.can(Action.Create, MealEntity);

    return await this.mealService.create(payload);
  }

  @Get(':id')
  async getDetail(
    @User() user: UserEntity,
    @Param('id') id: string,
    @MealAbility() ability: Ability<MealEntity>,
  ): Promise<MealEntity> {
    const meal = await this.mealService.getDetail(id);
    ability.can(Action.Read, meal);

    return meal;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', storage))
  async update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() payload: UpdateMealDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @MealAbility() ability: Ability<MealEntity>,
  ): Promise<MealEntity> {
    const meal = await this.mealService.getDetail(id);
    ability.can(Action.Update, meal);

    return await this.mealService.update({
      ...meal,
      ...payload,
      image: file.path,
    });
  }

  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: string,
    @MealAbility() ability: Ability<MealEntity>,
  ): Promise<DeleteResult> {
    const meal = await this.mealService.getDetail(id);
    ability.can(Action.Delete, meal);

    return await this.mealService.delete(id);
  }
}
