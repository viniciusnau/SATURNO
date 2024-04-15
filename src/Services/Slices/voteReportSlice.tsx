import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface voteReportState {
  data: any;
  loading: boolean;
  error: boolean;
}

const initialState: voteReportState = {
  data: [],
  loading: false,
  error: false,
};

const resetPasswordSlice = createSlice({
  name: "voteReport",
  initialState,
  reducers: {
    getVoteReport: (state) => {
      state.loading = true;
      state.error = false;
      state.data = null;
    },
    getVoteReportSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload.data;
    },
    getVoteReportFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = null;
    },
  },
});

export const { getVoteReport, getVoteReportSuccess, getVoteReportFailure } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;

export const fetchResetPassword =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "voteReport/getVoteReport"
        | "voteReport/getVoteReportSuccess"
        | "voteReport/getVoteReportFailure";
    }) => void
  ) => {
    dispatch(getVoteReport());
    try {
      const response = await services.getVoteReport();
      dispatch(getVoteReportSuccess(response));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getVoteReportFailure());
    }
  };
