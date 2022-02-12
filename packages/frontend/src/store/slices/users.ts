import {
    createUserAsync, deleteUserByIdAsync, getAllUsersAsync, updateUserAsync
} from 'store/actions/users';
import Slices from 'types/enums/Slices';
import { IUser } from 'types/interfaces/user';

import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

export const usersAdapter = createEntityAdapter<IUser>();

interface IUsersSliceState {
  loading: boolean;
  users: EntityState<IUser>;
}

const initialState: IUsersSliceState = {
  loading: false,
  users: usersAdapter.getInitialState(),
};

const usersRequestStarted = (state: IUsersSliceState) => {
  state.loading = true;
};

const userUpsertFulfilled = (
  state: IUsersSliceState,
  { payload }: PayloadAction<IUser>
) => {
  state.loading = false;
  usersAdapter.upsertOne(state.users, payload);
};

const usersSlice = createSlice({
  name: Slices.Users,
  initialState,
  reducers: {},
  extraReducers: {
    // Create user
    [createUserAsync.pending.type]: usersRequestStarted,
    [createUserAsync.fulfilled.type]: userUpsertFulfilled,
    [createUserAsync.rejected.type]: () => {},
    // Update user
    [updateUserAsync.pending.type]: usersRequestStarted,
    [updateUserAsync.fulfilled.type]: userUpsertFulfilled,
    [updateUserAsync.rejected.type]: () => {},
    // Get all users
    [getAllUsersAsync.pending.type]: usersRequestStarted,
    [getAllUsersAsync.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IUser[]>
    ) => {
      state.loading = false;
      usersAdapter.upsertMany(state.users, payload);
    },
    [getAllUsersAsync.rejected.type]: () => {},
    // Delete user by id
    [deleteUserByIdAsync.pending.type]: usersRequestStarted,
    [deleteUserByIdAsync.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IUser["id"]>
    ) => {
      state.loading = false;
      usersAdapter.removeOne(state.users, payload);
    },
    [deleteUserByIdAsync.rejected.type]: () => {},
  },
});

export default usersSlice;
