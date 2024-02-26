import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface LoginState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: LoginState = {
  data: [],
  loading: false,
  error: false,
};

const usersListSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLogin: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getLoginSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getLoginFailure: (state: any) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getLogin, getLoginSuccess, getLoginFailure } =
  usersListSlice.actions;

export default usersListSlice.reducer;

export const fetchLogin =
  (body: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "login/getLogin"
        | "login/getLoginSuccess"
        | "login/getLoginFailure";
    }) => void
  ) => {
    dispatch(getLogin());
    try {
      const response = await services.getLogin(body);
      dispatch(getLoginSuccess(response.data));
    } catch (err) {
      dispatch(getLoginFailure());
    }
  };
