import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";
import resetPassword from "./Slices/resetPassword";
import checkHashSlice from "./Slices/checkHashSlice";
import electionsResultSlice from "./Slices/resultsSlice";
import candidatesSlice from "./Slices/candidatesSlice";

const reducer = combineReducers({
  loginSlice,
  resetPassword,
  checkHashSlice,
  electionsResultSlice,
  candidatesSlice,
});

export const store = configureStore({ reducer });
