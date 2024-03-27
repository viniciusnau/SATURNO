import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";
import resetPassword from "./Slices/resetPassword";
import checkHashSlice from "./Slices/checkHashSlice";
import electionsResultSlice from "./Slices/resultsSlice";
import candidatesSlice from "./Slices/candidatesSlice";
import voteReportSlice from "./Slices/voteReportSlice";

const reducer = combineReducers({
  loginSlice,
  resetPassword,
  checkHashSlice,
  electionsResultSlice,
  candidatesSlice,
  voteReportSlice,
});

export const store = configureStore({ reducer });
