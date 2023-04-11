import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm';
import { MealEntity } from '../database/entities/meal.entity';
import { CreateMealDto } from './dtos/create-meal.dto';
import { GetMealDto } from './dtos/get-meal.dto';

@Injectable()
export class MealService {
  private readonly limit = 6;

  constructor(
    @InjectRepository(MealEntity)
    private readonly mealRepository: Repository<MealEntity>,
  ) {}

  async create(payload: CreateMealDto): Promise<MealEntity> {
    return this.mealRepository.save(payload);
  }

  async getList(userId: string, filter: GetMealDto): Promise<MealEntity[]> {
    return await this.mealRepository.find({
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

  async getDetail(id: string): Promise<MealEntity> {
    try {
      return await this.mealRepository.findOneOrFail({
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

  async update(payload: MealEntity): Promise<MealEntity> {
    await this.mealRepository.update(payload.id, payload);

    return this.getDetail(payload.id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.mealRepository.delete({ id });
  }
}
