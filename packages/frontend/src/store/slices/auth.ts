import { loginAsync, logout, registerAsync } from 'store/actions/auth';
import Slices from 'types/enums/Slices';
import { IAuthState } from 'types/interfaces/auth';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSliceState = IAuthState & {
  loading: boolean;
};

const initialState: AuthSliceState = {
  loading: false,
  authToken: "",
  refreshToken: "",
};

const authRequestStarted = (state: AuthSliceState) => {
  state.loading = true;
};

const authRequestFulfilled = (
  state: AuthSliceState,
  { payload: { authToken, refreshToken } }: PayloadAction<IAuthState>
) => {
  state.loading = false;
  state.authToken = authToken;
  state.refreshToken = refreshToken;
};

const authSlice = createSlice({
  name: Slices.Auth,
  initialState,
  reducers: {},
  extraReducers: {
    [logout.type]: (state: IAuthState) => {
      state.authToken = "";
      state.refreshToken = "";
    },
    [loginAsync.pending.type]: authRequestStarted,
    [loginAsync.fulfilled.type]: authRequestFulfilled,
    [loginAsync.rejected.type]: authRequestFulfilled,
    [registerAsync.pending.type]: authRequestStarted,
    [registerAsync.fulfilled.type]: authRequestFulfilled,
    [registerAsync.rejected.type]: authRequestFulfilled,
  },
});

export default authSlice;
