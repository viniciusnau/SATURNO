import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface LoginState {
  data: any;
  loading: boolean;
  error: boolean;
  status: number;
}

const initialState: LoginState = {
  data: {},
  loading: false,
  error: false,
  status: 401,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLogin: (state) => {
      state.data = {};
      state.loading = true;
      state.error = false;
      state.status = 401;
    },
    getLoginSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false;
      state.status = 200;
    },
    getLoginFailure: (state, action) => {
      state.data = {};
      state.loading = false;
      state.error = true;
      state.status = action.payload;
    },
  },
});

export const { getLogin, getLoginSuccess, getLoginFailure } =
  loginSlice.actions;

export default loginSlice.reducer;

export const fetchLogin = (body: any) => async (dispatch: any) => {
  dispatch(getLogin());
  try {
    const response = await services.getLogin(body);
    dispatch(getLoginSuccess(response?.data));
  } catch (err: any) {
    dispatch(getLoginFailure(err?.response?.status));
  }
};
