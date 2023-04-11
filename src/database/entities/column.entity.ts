import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('columns')
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'varchar', nullable: false })
  hashtag: string;

  @Column({ type: 'varchar', nullable: false })
  thumbnail: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
