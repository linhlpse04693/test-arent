import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(inputs: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(inputs);
  }
}
