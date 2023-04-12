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
import { diskStorage } from 'multer';
import * as path from 'path';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { GetMealDto } from '../meal/dtos/get-meal.dto';
import { Ability } from '../casl/ability';
import { Action } from '../casl/action';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateMealDto } from '../meal/dtos/update-meal.dto';
import { DeleteResult } from 'typeorm';
import { ColumnService } from './column.service';
import { ColumnEntity } from '../database/entities/column.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateColumnDto } from './dtos/create-column.dto';
import { ColumnAbility } from '../casl/decorators/column-ability.decorator';
import { SkipJwtAuth } from '../decorators/skip-jwt-auth.decorator';

export const storage = {
  storage: diskStorage({
    destination: './public/column/thumbnail',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @SkipJwtAuth()
  @Get()
  async getList(
    @User() user: UserEntity,
    @Query() filter: GetMealDto,
    @ColumnAbility() ability: Ability<ColumnEntity>,
  ): Promise<ColumnEntity[]> {
    ability.can(Action.ReadList, ColumnEntity);

    return await this.columnService.getList(filter);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  async create(
    @User() user: UserEntity,
    @Body() payload: CreateColumnDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @ColumnAbility()
    ability: Ability<ColumnEntity>,
  ): Promise<ColumnEntity> {
    payload.userId = user.id;
    payload.thumbnail = file.path;
    ability.can(Action.Create, ColumnEntity);

    return await this.columnService.create(payload);
  }

  @SkipJwtAuth()
  @Get(':id')
  async getDetail(
    @User() user: UserEntity,
    @Param('id') id: string,
    @ColumnAbility() ability: Ability<ColumnEntity>,
  ): Promise<ColumnEntity> {
    const meal = await this.columnService.getDetail(id);
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
    @ColumnAbility() ability: Ability<ColumnEntity>,
  ): Promise<ColumnEntity> {
    const meal = await this.columnService.getDetail(id);
    ability.can(Action.Update, meal);

    return await this.columnService.update({
      ...meal,
      ...payload,
      thumbnail: file.path,
    });
  }

  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: string,
    @ColumnAbility() ability: Ability<ColumnEntity>,
  ): Promise<DeleteResult> {
    const meal = await this.columnService.getDetail(id);
    ability.can(Action.Delete, meal);

    return await this.columnService.delete(id);
  }
}
