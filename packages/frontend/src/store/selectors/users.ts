import { IUser } from "monotypes/IUser.interface";
import { RootState } from "store";
import { usersAdapter } from "store/slices/users";

import { createSelector } from "@reduxjs/toolkit";

const usersSelector = (state: RootState) => state.users.users;

const users = usersAdapter.getSelectors(usersSelector);

export const selectAllUsers = users.selectAll;

export const selectUserById = users.selectById;

export const selectUsersByIds = (ids: IUser["id"][]) =>
  createSelector(users.selectAll, (users) =>
    users.filter((user) => {
      return ids.includes(user.id);
    })
  );
