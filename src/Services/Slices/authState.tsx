import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface AuthState {
  apiToken: string | null;
  tokenExpiration: number | null;
  tokenTimeLeft: number | null;
}

const initialState: AuthState = {
  apiToken: null,
  tokenExpiration: null,
  tokenTimeLeft: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApiToken: (state, action) => {
      state.apiToken = action.payload;
    },
    setTokenExpiration: (state, action) => {
      state.tokenExpiration = action.payload;
    },
    setTokenTimeLeft: (state, action) => {
      state.tokenTimeLeft = action.payload;
    },
  },
});

export const { setApiToken, setTokenExpiration, setTokenTimeLeft } =
  authSlice.actions;

export const fetchTokenTimeLeft = () => async (dispatch: any) => {
  try {
    const response = await services.getTokenLifetime();
    dispatch(setTokenTimeLeft(response.time_left));
  } catch (error) {
    console.error("Erro ao buscar o tempo restante do token:", error);
  }
};

export default authSlice.reducer;
