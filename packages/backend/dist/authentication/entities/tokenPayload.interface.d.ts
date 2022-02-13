import { User } from 'src/users/entities/user.entity';
export interface TokenPayload {
    userId: User['id'];
}
