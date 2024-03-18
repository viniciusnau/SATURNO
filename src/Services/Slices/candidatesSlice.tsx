import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";

interface CandidatesState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: CandidatesState = {
  data: [],
  loading: false,
  error: false,
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    getCandidates: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getCandidatesSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getCandidatesFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getCandidates, getCandidatesSuccess, getCandidatesFailure } =
  candidatesSlice.actions;

export default candidatesSlice.reducer;

export const fetchCandidates =
  (positionId: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "candidates/getCandidates"
        | "candidates/getCandidatesSuccess"
        | "candidates/getCandidatesFailure";
    }) => void
  ) => {
    dispatch(getCandidates());
    try {
      const response = await services.getListCandidates(positionId);
      dispatch(getCandidatesSuccess(response));
    } catch (error) {
      dispatch(getCandidatesFailure());
    }
  };
