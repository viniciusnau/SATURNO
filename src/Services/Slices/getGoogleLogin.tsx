import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";

interface GoogleTokenLoginState {
  data: any;
  loading: boolean;
  error: boolean;
  status: number;
}

const initialState: GoogleTokenLoginState = {
  data: {},
  loading: false,
  error: false,
  status: 401,
};

const googleTokenLoginSlice = createSlice({
  name: "googleTokenLogin",
  initialState,
  reducers: {
    getGoogleTokenLogin: (state) => {
      state.loading = true;
      state.error = false;
      state.status = 401;
    },
    getGoogleTokenLoginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = false;
      state.status = 200;
      state.data = action.payload;
    },
    getGoogleTokenLoginFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.status = 401;
    },
  },
});

export const {
  getGoogleTokenLogin,
  getGoogleTokenLoginSuccess,
  getGoogleTokenLoginFailure,
} = googleTokenLoginSlice.actions;

export default googleTokenLoginSlice.reducer;

export const fetchGoogleTokenLogin = (body: any) => async (dispatch: any) => {
  dispatch(getGoogleTokenLogin());
  try {
    const response = await services.googleTokenLogin(body);
    dispatch(getGoogleTokenLoginSuccess(response.data));
  } catch (err) {
    dispatch(getGoogleTokenLoginFailure());
  }
};
