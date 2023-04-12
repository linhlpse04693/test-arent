import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm';
import { GetMealDto } from '../meal/dtos/get-meal.dto';
import { ColumnEntity } from '../database/entities/column.entity';
import { CreateColumnDto } from './dtos/create-column.dto';

@Injectable()
export class ColumnService {
  private readonly limit = 6;

  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(payload: CreateColumnDto): Promise<ColumnEntity> {
    return this.columnRepository.save(payload);
  }

  async getList(filter: GetMealDto): Promise<ColumnEntity[]> {
    return await this.columnRepository.find({
      order: {
        createdAt: 'DESC',
      },
      skip: this.limit * (filter.page - 1),
      take: this.limit,
    });
  }

  async getDetail(id: string): Promise<ColumnEntity> {
    try {
      return await this.columnRepository.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('Not found!');
      }

      throw new HttpException(
        'Unexpected error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(payload: ColumnEntity): Promise<ColumnEntity> {
    await this.columnRepository.update(payload.id, payload);

    return this.getDetail(payload.id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.columnRepository.delete({ id });
  }
}
