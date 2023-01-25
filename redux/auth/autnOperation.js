import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authSlice } from "./authSlice";
// export const registerUser = createAsyncThunk("auth/register", async ({ email, login, password }, { rejectWithValue }) => {
//   try {
//     const user = await createUserWithEmailAndPassword(getAuth(db), email, password);
//     console.log(user);
//   } catch (error) {
//     return rejectWithValue();
//   }
// });

export const authSignUp =
  ({ email, login, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(getAuth(db), email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      console.log(user);
    } catch (error) {}
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(getAuth(db), email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
