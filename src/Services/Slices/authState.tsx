import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface AuthState {
  apiToken: string | null;
  tokenTimeLeft: number | null;
  expiresAt: string | null;
  currentTime: string | null;
}

const initialState: AuthState = {
  apiToken: null,
  tokenTimeLeft: null,
  expiresAt: null,
  currentTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApiToken: (state, action) => {
      state.apiToken = action.payload;
    },
    setTokenTimeLeft: (state, action) => {
      state.tokenTimeLeft = action.payload;
    },
    setExpiresAt: (state, action) => {
      state.expiresAt = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

export const { setApiToken, setTokenTimeLeft, setExpiresAt, setCurrentTime } =
  authSlice.actions;

export const fetchTokenTimeInfo = () => async (dispatch: any) => {
  try {
    const response = await services.getTokenLifetime();
    dispatch(setTokenTimeLeft(response.time_left));
    dispatch(setExpiresAt(response.expires_at));
    dispatch(setCurrentTime(response.current_time));
  } catch (error) {
    console.error("Erro ao buscar as informações do token:", error);
  }
};

export default authSlice.reducer;
