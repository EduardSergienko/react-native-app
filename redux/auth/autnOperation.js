import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authLogOut, updateUserProfile } from "./authSlice";

export const authSignUp =
  ({ email, login, password, userAvatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(getAuth(db), email, password);
      const user = getAuth(db).currentUser;

      await updateProfile(user, {
        displayName: login,
        photoURL: userAvatar,
      });

      const { displayName, uid, photoURL } = getAuth(db).currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          userAvatar: photoURL,
          userEmail: email,
          stateChange: true,
        })
      );
    } catch (error) {}
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(getAuth(db), email, password);
      // console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
export const authStateChange = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(getAuth(db), (user) => {
      if (user) {
        const userUpdateProfile = {
          stateChange: true,
          userId: user.uid,
          userName: user.displayName,
          userAvatar: user.photoURL,
          userEmail: user.email,
        };
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {}
};

export const userLogOut = () => async (dispatch, getState) => {
  try {
    await signOut(getAuth(db));
    dispatch(authLogOut());
  } catch (error) {}
};
