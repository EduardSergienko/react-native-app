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

import { authLogOut, updateUserProfile, authChangeState } from "./authSlice";
import { async } from "@firebase/util";

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

      const { displayName, uid, photoURL, email } = getAuth(db).currentUser;
      console.log(photoURL);
      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          userAvatar: photoURL,
          userEmail: email,
        })
      );
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
          userAvatar: user.photoURL,
          userEmail: user.email,
        };
        dispatch(authChangeState({ stateChange: true }));
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
