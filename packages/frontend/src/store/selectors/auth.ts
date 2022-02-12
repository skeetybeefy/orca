import { RootState } from "store";
import Slices from "types/enums/Slices";

import { createSelector } from "@reduxjs/toolkit";

const authStateSelector = (state: RootState) => state[`${Slices.Auth}`];

export const userIsAuthorizedSelector = createSelector(
  authStateSelector,
  ({ authToken, refreshToken }) => Boolean(authToken && refreshToken)
);
