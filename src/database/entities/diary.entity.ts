import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('diaries')
export class DiaryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
