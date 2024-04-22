import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/getLogin";
import resetPassword from "./Slices/resetPassword";
import checkHashSlice from "./Slices/checkHashSlice";
import electionsResultSlice from "./Slices/resultsSlice";
import authSlice from "./Slices/authState";
import logoutSlice from "./Slices/logoutSlice";
import meId from "./Slices/meId";
import getListCandidates from "./Slices/getListCandidates";
import selectedCandidate from "./Slices/selectedCandidate";
import candidatesSlice from "./Slices/candidatesSlice";
import voteReportSlice from "./Slices/voteReportSlice";
import postRegister from "./Slices/postRegisterSlice";
import electionsPDFDataSlice from "./Slices/electionsResultPDFDataSlice";

const reducer = combineReducers({
  loginSlice,
  resetPassword,
  checkHashSlice,
  electionsResultSlice,
  authSlice,
  logoutSlice,
  meId,
  getListCandidates,
  selectedCandidate,
  candidatesSlice,
  voteReportSlice,
  postRegister,
  electionsPDFDataSlice,
});

export const store = configureStore({ reducer });