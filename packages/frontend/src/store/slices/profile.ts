import { IUser } from "monotypes/IUser.interface";
import {
  authenticateAsync,
  loginAsync,
  logoutAsync,
  registerAsync,
} from "store/actions/profile";
import Slices from "types/enums/Slices";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProfileSliceState = {
  initialAuthenticationPassed: boolean;
  user: IUser | null;
  loading: boolean;
};

const initialState: ProfileSliceState = {
  initialAuthenticationPassed: false,
  loading: false,
  user: null,
};

const requestStarted = (state: ProfileSliceState) => {
  state.loading = true;
};

const removeUser = (state: ProfileSliceState) => {
  state.loading = false;
  state.user = null;
  state.initialAuthenticationPassed = true;
};

const userLoaded = (state: ProfileSliceState, action: PayloadAction<IUser>) => {
  state.loading = false;
  state.user = action.payload;
  state.initialAuthenticationPassed = true;
};

const profileSlice = createSlice({
  name: Slices.Profile,
  initialState,
  reducers: {},
  extraReducers: {
    [loginAsync.pending.type]: requestStarted,
    [loginAsync.fulfilled.type]: userLoaded,
    [loginAsync.rejected.type]: removeUser,
    [logoutAsync.pending.type]: removeUser,
    [authenticateAsync.pending.type]: requestStarted,
    [authenticateAsync.fulfilled.type]: userLoaded,
    [authenticateAsync.rejected.type]: removeUser,
    [registerAsync.pending.type]: requestStarted,
    [registerAsync.fulfilled.type]: userLoaded,
    [registerAsync.rejected.type]: removeUser,
  },
});

export default profileSlice;
