import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from '@nestjs/class-transformer';

export class BaseEntity {
  @Expose()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
