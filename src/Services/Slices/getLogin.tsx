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
      state.loading = true;
      state.error = false;
      state.status = 401;
    },
    getLoginSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.status = 200;
      state.data = action.payload;
    },
    getLoginFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.status = 401;
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
    dispatch(getLoginSuccess(response.data));
  } catch (err) {
    dispatch(getLoginFailure());
  }
};
