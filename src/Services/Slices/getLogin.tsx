import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface LoginState {
  data: any;
  loading: boolean;
  error: boolean;
}

const initialState: LoginState = {
  data: {},
  loading: false,
  error: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLogin: (state) => {
      state.loading = true;
      state.error = false;
    },
    getLoginSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getLoginFailure: (state) => {
      state.loading = false;
      state.error = true;
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
