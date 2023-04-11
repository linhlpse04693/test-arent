import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { DiaryEntity } from './diary.entity';
import { Exclude } from '@nestjs/class-transformer';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => DiaryEntity, (diary) => diary.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  diaries: DiaryEntity[];
}
