import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from '@nestjs/class-transformer';

export class BaseEntity {
  @Expose()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
