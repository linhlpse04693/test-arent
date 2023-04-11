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
import { BodyRecordService } from './body-record.service';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { Ability } from '../casl/ability';
import { Action } from '../casl/action';
import { DeleteResult } from 'typeorm';
import { BodyRecordEntity } from '../database/entities/body-record.entity';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UpdateRecordDto } from './dtos/update-record.dto';
import { RecordAbility } from '../casl/decorators/record-ability.decorator';
import { GetRecordDto } from './dtos/get-record.dto';

@Controller('records')
export class BodyRecordController {
  constructor(private readonly recordService: BodyRecordService) {}

  @Get()
  async getList(
    @User() user: UserEntity,
    @Query() filter: GetRecordDto,
    @RecordAbility() ability: Ability<BodyRecordEntity>,
  ): Promise<BodyRecordEntity[]> {
    ability.can(Action.ReadList, BodyRecordEntity);

    return await this.recordService.getList(user.id, filter);
  }

  @Post()
  async create(
    @User() user: UserEntity,
    @Body() payload: CreateRecordDto,
    @RecordAbility() ability: Ability<BodyRecordEntity>,
  ): Promise<BodyRecordEntity> {
    payload.userId = user.id;
    ability.can(Action.Create, BodyRecordEntity);

    return await this.recordService.create(payload);
  }

  @Get(':id')
  async getDetail(
    @User() user: UserEntity,
    @Param('id') id: string,
    @RecordAbility() ability: Ability<BodyRecordEntity>,
  ): Promise<BodyRecordEntity> {
    const diary = await this.recordService.getDetail(id);
    ability.can(Action.Read, diary);

    return diary;
  }

  @Put(':id')
  async update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() payload: UpdateRecordDto,
    @RecordAbility() ability: Ability<BodyRecordEntity>,
  ): Promise<BodyRecordEntity> {
    const diary = await this.recordService.getDetail(id);
    ability.can(Action.Update, diary);

    return await this.recordService.update({ ...diary, ...payload });
  }

  @Delete(':id')
  async delete(
    @User() user: UserEntity,
    @Param('id') id: string,
    @RecordAbility() ability: Ability<BodyRecordEntity>,
  ): Promise<DeleteResult> {
    const diary = await this.recordService.getDetail(id);
    ability.can(Action.Delete, diary);

    return await this.recordService.delete(id);
  }
}
