import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface RolesState {
  roles: string[];
  loading: boolean;
  error: boolean;
}

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: false,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    getRolesStart: (state) => {
      state.loading = true;
      state.error = false;
      state.roles = [];
    },
    getRolesSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.roles = action.payload;
    },
    getRolesFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.roles = [];
    },
  },
});

export const { getRolesStart, getRolesSuccess, getRolesFailure } = rolesSlice.actions;

export default rolesSlice.reducer;

export const fetchRoles = () => async (dispatch: any) => {
  dispatch(getRolesStart());
  try {
    const response = await services.getRoles();
    dispatch(getRolesSuccess(response));
  } catch (err) {
    dispatch(getRolesFailure());
  }
};
