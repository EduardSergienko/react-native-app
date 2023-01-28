import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: null,
  userAvatar: "",
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
    }),
    authChangeState: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
    authLogOut: () => state,
  },
});

export const { updateUserProfile, authChangeState, authLogOut } = authSlice.actions;
