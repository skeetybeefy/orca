import AuthService from "api/services/auth";
import { ICredentials } from "monotypes/ICredentials.interface";
import { ICreateUserDto, IUser } from "monotypes/IUser.interface";
import Slices from "types/enums/Slices";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const authenticateAsync = createAsyncThunk(
  `${Slices.Profile}/auth`,
  async (_, { rejectWithValue }): Promise<IUser> => {
    try {
      return await AuthService.authenticate();
    } catch (e) {
      throw rejectWithValue(null);
    }
  }
);

export const loginAsync = createAsyncThunk(
  `${Slices.Profile}/login`,
  async (credentials: ICredentials, { rejectWithValue }): Promise<IUser> => {
    try {
      return await AuthService.logIn(credentials);
    } catch (e) {
      throw rejectWithValue(null);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  `${Slices.Profile}/login`,
  async (_, { rejectWithValue }): Promise<void> => {
    try {
      await AuthService.logOut();
    } catch (e) {
      throw rejectWithValue(null);
    }
  }
);

export const registerAsync = createAsyncThunk(
  `${Slices.Profile}/register`,
  async (user: ICreateUserDto, { rejectWithValue }): Promise<IUser> => {
    try {
      return await AuthService.register(user);
    } catch (e) {
      throw rejectWithValue(null);
    }
  }
);
