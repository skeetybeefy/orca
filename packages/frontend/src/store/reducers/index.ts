import authSlice from 'store/slices/auth';
import documentsSlice from 'store/slices/documents';
import groupsSlice from 'store/slices/groups';
import usersSlice from 'store/slices/users';
import Slices from 'types/enums/Slices';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [Slices.Auth]: authSlice.reducer,
  [Slices.Documents]: documentsSlice.reducer,
  [Slices.Groups]: groupsSlice.reducer,
  [Slices.Users]: usersSlice.reducer,
});

export default rootReducer;
