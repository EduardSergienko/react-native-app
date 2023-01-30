import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: "",
  userAvatar: "",
  stateChange: false,
  userEmail: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userAvatar: payload.userAvatar,
      userEmail: payload.userEmail,
      stateChange: payload.stateChange,
    }),

    authLogOut: () => state,
  },
});

export const { updateUserProfile, authChangeState, authLogOut } = authSlice.actions;
