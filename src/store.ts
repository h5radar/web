import { configureStore } from "@reduxjs/toolkit";

import { radarUserReducer } from "@/features/user-slice";

export const store = configureStore({
  reducer: {
    radarUser: radarUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
