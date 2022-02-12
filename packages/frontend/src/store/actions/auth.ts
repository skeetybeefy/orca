import AuthService from "api/services/auth";
import Slices from "types/enums/Slices";
import { IAuthCredentials, IAuthState } from "types/interfaces/auth";

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAction(`${Slices.Auth}/logout`);

export const loginAsync = createAsyncThunk(
  `${Slices.Auth}/login`,
  async (
    credentials: IAuthCredentials,
    { rejectWithValue }
  ): Promise<IAuthState> => {
    try {
      const tokensPair = await AuthService.login(credentials);
      return tokensPair;
    } catch (e) {
      throw rejectWithValue({ authToken: "", refreshToken: "" });
    }
  }
);

export const registerAsync = createAsyncThunk(
  `${Slices.Auth}/register`,
  async (
    credentials: IAuthCredentials,
    { rejectWithValue }
  ): Promise<IAuthState> => {
    try {
      const tokensPair = await AuthService.register(credentials);
      return tokensPair;
    } catch (e) {
      throw rejectWithValue({ authToken: "", refreshToken: "" });
    }
  }
);
