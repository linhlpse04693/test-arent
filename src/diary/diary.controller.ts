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
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { DiaryEntity } from '../database/entities/diary.entity';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dtos/create-diary.dto';
import { DiaryAbility } from '../casl/decorators/diary-ability.decorator';
import { Ability } from '../casl/ability';
import { Action } from '../casl/action';
import { UpdateDiaryDto } from './dtos/update-diary.dto';
import { DeleteResult } from 'typeorm';
import { GetDiaryDto } from './dtos/get-diary.dto';

@Controller('diaries')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get()
  async getList(
    @User() user: UserEntity,
    @Query() filter: GetDiaryDto,
    @DiaryAbility() ability: Ability<DiaryEntity>,
  ): Promise<DiaryEntity[]> {
    ability.can(Action.ReadList, DiaryEntity);

    return await this.diaryService.getList(user.id, filter);
  }

  @Post()
  async create(
    @User() user: UserEntity,
    @Body() payload: CreateDiaryDto,
    @DiaryAbility() ability: Ability<DiaryEntity>,
  ): Promise<DiaryEntity> {
    payload.userId = user.id;
    ability.can(Action.Create, DiaryEntity);

    return await this.diaryService.create(payload);
  }

  @Get(':id')
  async getDetail(
    @User() user: UserEntity,
    @Param('id') id: string,
    @DiaryAbility() ability: Ability<DiaryEntity>,
  ): Promise<DiaryEntity> {
    const diary = await this.diaryService.getDetail(id);
    ability.can(Action.Read, diary);

    return diary;
  }

  @Put(':id')
  async update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() payload: UpdateDiaryDto,
    @DiaryAbility() ability: Ability<DiaryEntity>,
  ): Promise<DiaryEntity> {
    const diary = await this.diaryService.getDetail(id);
    ability.can(Action.Update, diary);

    return await this.diaryService.update({ ...diary, ...payload });
  }

  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: string,
    @DiaryAbility() ability: Ability<DiaryEntity>,
  ): Promise<DeleteResult> {
    const diary = await this.diaryService.getDetail(id);
    ability.can(Action.Delete, diary);

    return await this.diaryService.delete(id);
  }
}
