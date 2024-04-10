import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";
import resetPassword from "./Slices/resetPassword";
import meId from "./Slices/meId";
import getListCandidates from "./Slices/getListCandidates";
import selectedCandidate from "./Slices/selectedCandidate";

const reducer = combineReducers({
  loginSlice,
  resetPassword,
  meId,
  getListCandidates,
  selectedCandidate
});

export const store = configureStore({ reducer });
