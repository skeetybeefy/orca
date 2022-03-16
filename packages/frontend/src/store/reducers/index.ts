import fileCardsSlice from 'store/slices/filecards';
import filesSlice from 'store/slices/files';
import groupsSlice from 'store/slices/groups';
import profileSlice from 'store/slices/profile';
import usersSlice from 'store/slices/users';
import Slices from 'types/enums/Slices';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [Slices.FileCards]: fileCardsSlice.reducer,
  [Slices.Files]: filesSlice.reducer,
  [Slices.Profile]: profileSlice.reducer,
  [Slices.Groups]: groupsSlice.reducer,
  [Slices.Users]: usersSlice.reducer,
});

export default rootReducer;
