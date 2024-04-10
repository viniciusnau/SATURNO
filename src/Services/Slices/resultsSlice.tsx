import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface ElectionsResultState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: ElectionsResultState = {
  data: [],
  loading: false,
  error: false,
};

const electionsResultSlice = createSlice({
  name: "electionsResult",
  initialState,
  reducers: {
    getElectionsResult: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getElectionsResultSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getElectionsResultFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  getElectionsResult,
  getElectionsResultSuccess,
  getElectionsResultFailure,
} = electionsResultSlice.actions;

export default electionsResultSlice.reducer;

export const fetchElectionsResult =
  (positionId: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "electionsResult/getElectionsResult"
        | "electionsResult/getElectionsResultSuccess"
        | "electionsResult/getElectionsResultFailure";
    }) => void
  ) => {
    dispatch(getElectionsResult());
    try {
      const response = await services.getElectionsResults(positionId);
      dispatch(getElectionsResultSuccess(response));
    } catch (error) {
      dispatch(getElectionsResultFailure());
    }
  };
