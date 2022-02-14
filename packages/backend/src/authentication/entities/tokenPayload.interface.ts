import { User } from 'users/entities/user.entity';

export interface TokenPayload {
  userId: User['id'];
}
