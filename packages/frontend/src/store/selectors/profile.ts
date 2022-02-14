import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";
import Slices from "types/enums/Slices";

const profileStateSelector = (state: RootState) => state[`${Slices.Profile}`];

export const profileSelector = createSelector(
  profileStateSelector,
  (state) => state.user
);

export const userIsAuthenticatedSelector = createSelector(
  profileStateSelector,
  (state) => Boolean(!state.initialAuthenticationPassed || state.user)
);
