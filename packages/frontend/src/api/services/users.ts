import { IUser } from 'types/interfaces/user';
import usersTestList from './usersTestList';

class UsersService {
  static _users: IUser[] = usersTestList;
  static _lastId: number = usersTestList.length;

  static async create(user: Omit<IUser, "id">): Promise<IUser> {
    const newUser: IUser = { ...user, id: `user_${UsersService._lastId++}` };
    UsersService._users.push(newUser);
    return newUser;
  }

  static async updateById(id: IUser["id"], user: IUser): Promise<IUser> {
    UsersService._users = UsersService._users.filter((user) => user.id !== id);
    UsersService._users.push(user);
    return user;
  }

  static async getAll(): Promise<IUser[]> {
    return UsersService._users;
  }

  static async deleteById(id: IUser["id"]): Promise<IUser["id"]> {
    UsersService._users = UsersService._users.filter((user) => user.id !== id);
    return id;
  }
}

export default UsersService;
