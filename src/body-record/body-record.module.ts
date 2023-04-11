import { Module } from '@nestjs/common';
import { BodyRecordEntity } from '../database/entities/body-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyRecordService } from './body-record.service';
import { BodyRecordController } from './body-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BodyRecordEntity])],
  providers: [BodyRecordService],
  controllers: [BodyRecordController],
})
export class BodyRecordModule {}
