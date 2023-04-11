import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntity } from '../database/entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntity])],
  providers: [DiaryService],
  controllers: [DiaryController],
})
export class DiaryModule {}
