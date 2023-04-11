import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm';
import { ExerciseEntity } from '../database/entities/exercise.entity';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { GetExerciseDto } from './dtos/get-exercise.dto';

@Injectable()
export class ExerciseService {
  private readonly limit = 6;

  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {}

  async create(payload: CreateExerciseDto): Promise<ExerciseEntity> {
    return this.exerciseRepository.save(payload);
  }

  async getList(
    userId: string,
    filter: GetExerciseDto,
  ): Promise<ExerciseEntity[]> {
    return await this.exerciseRepository.find({
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

  async getDetail(id: string): Promise<ExerciseEntity> {
    try {
      return await this.exerciseRepository.findOneOrFail({
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

  async update(payload: ExerciseEntity): Promise<ExerciseEntity> {
    await this.exerciseRepository.update(payload.id, payload);

    return this.getDetail(payload.id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.exerciseRepository.delete({ id });
  }
}
