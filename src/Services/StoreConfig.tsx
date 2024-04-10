import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";
import resetPassword from "./Slices/resetPassword";
import checkHashSlice from "./Slices/checkHashSlice";
import electionsResultSlice from "./Slices/resultsSlice";
import candidatesSlice from "./Slices/candidatesSlice";
import authSlice from "./Slices/authState";
import logoutSlice from "./Slices/logoutSlice";

const reducer = combineReducers({
  loginSlice,
  resetPassword,
  checkHashSlice,
  electionsResultSlice,
  candidatesSlice,
  authSlice,
  logoutSlice,
});

export const store = configureStore({ reducer });
