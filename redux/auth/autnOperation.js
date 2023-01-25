import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
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
      await createUserWithEmailAndPassword(getAuth(db), email, password);
      const user = getAuth(db).currentUser;

      await updateProfile(user, {
        displayName: login,
      });
      const { displayName, uid } = getAuth(db).currentUser;

      dispatch(authSlice.actions.updateUserProfile({ userId: uid, userName: displayName }));
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
export const authStateChange = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(getAuth(db), (user) => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          userName: user.displayName,
        };
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {}
};
