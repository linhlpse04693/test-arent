import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BodyRecordEntity } from '../database/entities/body-record.entity';
import {
  Between,
  DeleteResult,
  EntityNotFoundError,
  Repository,
} from 'typeorm';
import { CreateRecordDto } from './dtos/create-record.dto';
import { GetRecordDto } from './dtos/get-record.dto';

@Injectable()
export class BodyRecordService {
  constructor(
    @InjectRepository(BodyRecordEntity)
    private readonly recordRepository: Repository<BodyRecordEntity>,
  ) {}

  async create(payload: CreateRecordDto): Promise<BodyRecordEntity> {
    return this.recordRepository.save(payload);
  }

  async getList(
    userId: string,
    filter: GetRecordDto,
  ): Promise<BodyRecordEntity[]> {
    return await this.recordRepository.find({
      where: {
        userId,
        createdAt: Between(filter.from, filter.to),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getDetail(id: string): Promise<BodyRecordEntity> {
    try {
      return await this.recordRepository.findOneOrFail({
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

  async update(payload: BodyRecordEntity): Promise<BodyRecordEntity> {
    await this.recordRepository.update(payload.id, payload);

    return this.getDetail(payload.id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.recordRepository.delete({ id });
  }
}
