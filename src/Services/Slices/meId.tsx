import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface meIdState {
  data: any[];
  loading: boolean;
  error: boolean;
  maxCount: number;
  positionId: number | any;
}

const initialState: meIdState = {
  data: [],
  loading: false,
  error: false,
  maxCount: 0,
  positionId: 0,
};

const meId = createSlice({
  name: "meId",
  initialState,
  reducers: {
    getmeId: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getmeIdSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getmeIdFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
    setMaxCount: (state, action) => {
      state.maxCount = action.payload;
    },
    setPositionId: (state, action) => {
      state.positionId = action.payload;
    },
  },
});

export const {
  getmeId,
  getmeIdSuccess,
  getmeIdFailure,
  setMaxCount,
  setPositionId,
} = meId.actions;

export default meId.reducer;

export const fetchmeId =
  (body?: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "meId/getmeId" | "meId/getmeIdSuccess" | "meId/getmeIdFailure";
    }) => void
  ) => {
    dispatch(getmeId());
    try {
      const response = await services.meId();
      dispatch(getmeIdSuccess(response));
    } catch (err) {
      dispatch(getmeIdFailure());
    }
  };
