import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: { name: null, email: null },
    userId: null,
    userName: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
    }),
    authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
  },
});
