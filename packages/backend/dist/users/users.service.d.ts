import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    getByEmail(email: string): Promise<User>;
    getById(id: User['id']): Promise<User>;
    update(id: User['id'], updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: User['id']): Promise<void>;
    setCurrentRefreshToken(refreshToken: string, userId: User['id']): Promise<void>;
    getUserIfRefreshTokenMatches(refreshToken: string, userId: User['id']): Promise<User>;
    removeRefreshToken(userId: User['id']): Promise<import("typeorm").UpdateResult>;
}
