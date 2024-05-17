import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";
import { IRegister, IRegisterState } from "../../Types/Types";

const initialState: IRegisterState = {
  data: [],
  loading: false,
  error: false,
  errorCode: null,
};

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    postRegister: (state: IRegisterState) => {
      state.loading = true;
      state.error = false;
      state.data = [];
      state.errorCode = null; 
    },
    postRegisterSuccess: (state: IRegisterState, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
      state.errorCode = null;
    },
    postRegisterFailure: (state: IRegisterState, action: PayloadAction<number | null>) => {
      state.loading = false;
      state.error = true;
      state.data = [];
      state.errorCode = action.payload;
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
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        dispatch(postRegisterFailure(409));
      } else {
        dispatch(postRegisterFailure(err.response ? err.response.status : null));
      }
    }
  };
