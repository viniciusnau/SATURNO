import { createSlice } from "@reduxjs/toolkit";
import services from "../services";
import { IPositionId, IRegister, IRegisterState } from "../../Types/Types";
import { AnyCnameRecord } from "dns";

const initialState: IRegisterState = {
  data: [],
  loading: false,
  error: false,
};

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    postRegister: (state: any) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    postRegisterSuccess: (state: any, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    postRegisterFailure: (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload.response;
      state.data = [];
    },
  },
});

export const { postRegister, postRegisterSuccess, postRegisterFailure } =
  RegisterSlice.actions;

export default RegisterSlice.reducer;

export const fetchRegister =
  (data: IRegister) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "register/postRegister"
        | "register/postRegisterSuccess"
        | "register/postRegisterFailure";
    }) => void
  ) => {
    dispatch(postRegister());
    try {
      const response = await services.postRegister(data);
      console.log(response)
      dispatch(postRegisterSuccess(response.data));
    } catch (err: any) {
      console.log(err?.response?.data?.error)
      dispatch(postRegisterFailure(err?.response?.data?.error));
    }
  };