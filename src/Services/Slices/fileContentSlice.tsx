import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface FileContentState {
  data: any;
  loading: boolean;
  error: boolean;
}

const initialState: FileContentState = {
  data: {},
  loading: false,
  error: false,
};

const fileContentSlice = createSlice({
  name: "fileContent",
  initialState,
  reducers: {
    getFileContent: (state) => {
      state.loading = true;
      state.error = false;
    },
    getFileContentSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getFileContentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getFileContent, getFileContentSuccess, getFileContentFailure } =
  fileContentSlice.actions;

export default fileContentSlice.reducer;

export const fetchFileContent = () => async (dispatch: any) => {
  dispatch(getFileContent());
  try {
    const response = await services.downloadHashReportPDF();
    dispatch(getFileContentSuccess(response.data));
  } catch (err) {
    dispatch(getFileContentFailure());
  }
};
