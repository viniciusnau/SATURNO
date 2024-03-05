import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface checkHashState {
  data: any;
  loading: boolean;
  error: boolean;
}

const initialState: checkHashState = {
  data: null,
  loading: false,
  error: false,
};

const checkHashSlice = createSlice({
  name: "checkHash",
  initialState,
  reducers: {
    getHashValidation: (state) => {
      state.loading = true;
      state.error = false;
      state.data = null;
    },
    getHashValidationSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getHashValidationFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = null;
    },
  },
});

export const {
  getHashValidation,
  getHashValidationSuccess,
  getHashValidationFailure,
} = checkHashSlice.actions;

export default checkHashSlice.reducer;

export const fetchCheckHash =
  (checkHash: string) =>
  async (
    dispatch: (arg0: {
      payload?: any;
      type:
        | "checkHash/getHashValidation"
        | "checkHash/getHashValidationSuccess"
        | "checkHash/getHashValidationFailure";
    }) => void
  ) => {
    dispatch(getHashValidation());
    try {
      const response = await services.getHashValidation(checkHash);
      dispatch(getHashValidationSuccess(response.data));
      return response;
    } catch (err) {
      dispatch(getHashValidationFailure());
      return { error: err };
    }
  };
