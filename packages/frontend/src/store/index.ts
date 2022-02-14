import logger from "redux-logger";
import rootReducer from "store/reducers";

import { configureStore } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;

export default store;
