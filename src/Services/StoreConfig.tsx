import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";
import resetPassword from "./Slices/resetPassword";

const reducer = combineReducers({
  loginSlice,
  resetPassword,
});

export const store = configureStore({ reducer });
