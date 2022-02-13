import { User } from 'src/users/entities/user.entity';
export declare class Group {
    id?: number;
    owner: User;
    members: User[];
    name: string;
    description: string;
}
