import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('exercises')
export class ExerciseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'float', nullable: false })
  energy: number;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
