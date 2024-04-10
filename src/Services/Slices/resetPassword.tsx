import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface resetPasswordState {
  data: any;
  loading: boolean;
  error: boolean;
}

const initialState: resetPasswordState = {
  data: [],
  loading: false,
  error: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    getResetPassword: (state) => {
      state.loading = true;
      state.error = false;
      state.data = null;
    },
    getResetPasswordSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload.data;
    },
    getResetPasswordFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = null;
    },
  },
});

export const {
  getResetPassword,
  getResetPasswordSuccess,
  getResetPasswordFailure,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;

export const fetchResetPassword =
  (form: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "resetPassword/getResetPassword"
        | "resetPassword/getResetPasswordSuccess"
        | "resetPassword/getResetPasswordFailure";
    }) => void
  ) => {
    dispatch(getResetPassword());
    try {
      const response = await services.resetPassword(form);
      dispatch(getResetPasswordSuccess(response));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getResetPasswordFailure());
    }
  };
