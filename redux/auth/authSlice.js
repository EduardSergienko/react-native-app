import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: { name: null, email: null },
    userId: null,
    userName: null,
    isLoggedIn: false,
  },
});
