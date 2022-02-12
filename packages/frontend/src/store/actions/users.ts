import UsersService from 'api/services/users';
import Slices from 'types/enums/Slices';
import { IUser } from 'types/interfaces/user';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface IUpdateUserProps {
  id: IUser["id"];
  user: IUser;
}

export const createUserAsync = createAsyncThunk(
  `${Slices.Users}/create`,
  async (user: Omit<IUser, "id">) => {
    return await UsersService.create(user);
  }
);

export const updateUserAsync = createAsyncThunk(
  `${Slices.Users}/update`,
  async ({ id, user }: IUpdateUserProps) => {
    return await UsersService.updateById(id, user);
  }
);

export const getAllUsersAsync = createAsyncThunk(
  `${Slices.Users}/getAll`,
  async () => {
    return await UsersService.getAll();
  }
);

export const deleteUserByIdAsync = createAsyncThunk(
  `${Slices.Users}/deleteById`,
  async (id: IUser["id"]) => {
    return await UsersService.deleteById(id);
  }
);
