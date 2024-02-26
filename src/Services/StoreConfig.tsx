import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";

const reducer = combineReducers({
  loginSlice,
});

export const store = configureStore({ reducer });
