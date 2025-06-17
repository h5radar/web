// src/features/radarUser/radarUserSlice.ts
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthContextProps } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { RadarUser } from "@/types/redux-types";

import { userSchema } from "@/schemas/user";

export interface RadarUserState {
  user: RadarUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: RadarUserState = {
  user: null,
  loading: false,
  error: null,
};

type CreateRadarUserArgs = {
  user: z.infer<typeof userSchema>;
  auth: AuthContextProps;
};

export const fetchRadarUser = createAsyncThunk<RadarUser, CreateRadarUserArgs>(
  "radarUser/fetchRadarUser",
  async ({ user, auth }) => {
    const res = await fetch(`${RADAR_API_URL}/radar-users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return (await res.json()) as RadarUser;
  },
);

const radarUserSlice = createSlice({
  name: "radarUser",
  initialState,
  reducers: {
    setRadarUser(state, action: PayloadAction<RadarUser>) {
      state.user = action.payload;
    },
    clearRadarUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRadarUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRadarUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchRadarUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setRadarUser, clearRadarUser } = radarUserSlice.actions;
export const radarUserReducer = radarUserSlice.reducer;
