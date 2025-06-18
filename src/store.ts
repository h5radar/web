import { AccountUserReducer } from "./features/account-slice";
import { configureStore } from "@reduxjs/toolkit";

import { radarUserReducer } from "@/features/user-slice";

export const store = configureStore({
  reducer: {
    radarUser: radarUserReducer,
    accountUser: AccountUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
