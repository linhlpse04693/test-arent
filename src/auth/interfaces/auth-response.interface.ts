import { UserEntity } from '../../database/entities/user.entity';

export interface AuthResponse {
  token: string;
  user: UserEntity;
}
