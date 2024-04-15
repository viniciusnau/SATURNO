import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface LogoutState {
  loading: boolean;
  error: string | null;
}

const initialState: LogoutState = {
  loading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutRequest, logoutSuccess, logoutFailure } =
  logoutSlice.actions;

export default logoutSlice.reducer;

export const logout = () => async (dispatch: any) => {
  dispatch(logoutRequest());
  try {
    await services.logout();
    dispatch(logoutSuccess());
  } catch (error: any) {
    dispatch(logoutFailure(error.message));
  }
};
