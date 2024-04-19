import { createSlice } from "@reduxjs/toolkit";
import services from "../services";
import { IPositionId, IRegister, IRegisterState } from "../../Types/Types";

const initialState: IRegisterState = {
  data: [],
  loading: false,
  error: false,
};

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    postRegister: (state: IRegisterState) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    postRegisterSuccess: (state: IRegisterState, action: any) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    postRegisterFailure: (state: IRegisterState) => {
      state.loading = false;
      state.error = true;
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
      dispatch(postRegisterSuccess(response.data));
    } catch (err) {
      dispatch(postRegisterFailure());
    }
  };
