import { createSlice } from "@reduxjs/toolkit";
import services from "../services";
import { IPositionId, IApproveRegisterState } from "../../Types/Types";

const initialState: IApproveRegisterState = {
  data: [],
  loading: false,
  error: false,
};

const approveRegisterListSlice = createSlice({
  name: "approveRegisterList",
  initialState,
  reducers: {
    getApproveRegisterList: (state: IApproveRegisterState) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getApproveRegisterListSuccess: (
      state: IApproveRegisterState,
      action: any
    ) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },

    getApproveRegisterListFailure: (state: IApproveRegisterState) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  getApproveRegisterList,
  getApproveRegisterListSuccess,
  getApproveRegisterListFailure,
} = approveRegisterListSlice.actions;

export default approveRegisterListSlice.reducer;

export const fetchListApproveRegister =
  (data: IPositionId) =>
  async (
    dispatch: (
      arg0:
        | {
            type: "approveRegisterList/getListCandidates";
          }
        | {
            type: "approveRegisterList/getListCandidatesSuccess";
            payload: any;
          }
        | {
            type: "approveRegisterList/getListCandidatesFailure";
          }
    ) => void
  ) => {
    dispatch({ type: "approveRegisterList/getListCandidates" });
    try {
      const response = await services.getApproveRegisterList(data);
      dispatch({
        type: "approveRegisterList/getListCandidatesSuccess",
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: "approveRegisterList/getListCandidatesFailure" });
    }
  };
