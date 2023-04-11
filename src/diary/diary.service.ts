import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaryEntity } from '../database/entities/diary.entity';
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm';
import { CreateDiaryDto } from './dtos/create-diary.dto';
import { GetDiaryDto } from './dtos/get-diary.dto';

@Injectable()
export class DiaryService {
  private readonly limit = 6;

  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
  ) {}

  async create(payload: CreateDiaryDto): Promise<DiaryEntity> {
    return this.diaryRepository.save(payload);
  }

  async getList(userId: string, filter: GetDiaryDto): Promise<DiaryEntity[]> {
    return await this.diaryRepository.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: this.limit * (filter.page - 1),
      take: this.limit,
    });
  }

  async getDetail(id: string): Promise<DiaryEntity> {
    try {
      return await this.diaryRepository.findOneOrFail({
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

  async update(payload: DiaryEntity): Promise<DiaryEntity> {
    await this.diaryRepository.update(payload.id, payload);

    return this.getDetail(payload.id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.diaryRepository.delete({ id });
  }
}
