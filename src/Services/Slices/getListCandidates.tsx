import { createSlice } from "@reduxjs/toolkit";
import services from "../services";
import { IPositionId, IListCandidatesState } from "../../Types/Types";
  
  const initialState: IListCandidatesState = {
    data: [],
    loading: false,
    error: false,
  };
  
  const ListCandidatesSlice = createSlice({
    name: "listCandidates",
    initialState,
    reducers: {
      getListCandidates: (state: IListCandidatesState) => {
        state.loading = true;
        state.error = false;
        state.data = [];
      },
      getListCandidatesSuccess: (state: IListCandidatesState, action: any) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      },
      
  
      getListCandidatesFailure: (state: IListCandidatesState) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      },
    },
  });
  
  export const { getListCandidates, getListCandidatesSuccess, getListCandidatesFailure } =
    ListCandidatesSlice.actions;
  
  export default ListCandidatesSlice.reducer;
  
  export const fetchListCandidates =
    (data: IPositionId) =>
    async (
      dispatch: (arg0: {
        payload: any;
        type:
          | "listCandidates/getListCandidates"
          | "listCandidates/getListCandidatesSuccess"
          | "listCandidates/getListCandidatesFailure";
      }) => void
    ) => {
      dispatch(getListCandidates());
      try {
        const response = await services.getListCandidatesByPositionId(data);
        dispatch(getListCandidatesSuccess(response.data));
      } catch (err) {
        dispatch(getListCandidatesFailure());
      }
    };