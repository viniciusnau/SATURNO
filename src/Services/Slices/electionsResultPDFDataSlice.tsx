import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface ElectionsPDFDataState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: ElectionsPDFDataState = {
  data: [],
  loading: false,
  error: false,
};

const electionsPDFDataSlice = createSlice({
  name: "electionsPDFData",
  initialState,
  reducers: {
    getElectionsPDFData: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getElectionsPDFDataSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getElectionsPDFDataFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  getElectionsPDFData,
  getElectionsPDFDataSuccess,
  getElectionsPDFDataFailure,
} = electionsPDFDataSlice.actions;

export default electionsPDFDataSlice.reducer;

export const fetchElectionsPDFData =
  (positionId: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "electionsPDFData/getElectionsPDFData"
        | "electionsPDFData/getElectionsPDFDataSuccess"
        | "electionsPDFData/getElectionsPDFDataFailure";
    }) => void
  ) => {
    dispatch(getElectionsPDFData());
    try {
      const response = await services.getElectionsResultPDFData(positionId);
      dispatch(getElectionsPDFDataSuccess(response));
    } catch (error) {
      dispatch(getElectionsPDFDataFailure());
    }
  };