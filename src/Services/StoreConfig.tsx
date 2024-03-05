import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";
import resetPassword from "./Slices/resetPassword";
import checkHashSlice from "./Slices/checkHashSlice";

const reducer = combineReducers({
  loginSlice,
  resetPassword,
  checkHashSlice,
});

export const store = configureStore({ reducer });
