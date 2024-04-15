import { createSlice } from '@reduxjs/toolkit';
import services from '../services';
import { IVoteState } from '../../Types/Types';

const initialState: IVoteState = {
    data: [],
    loading: false,
    error: false,
};

const postCreateVoteSlice = createSlice({
    name: "postVote",
    initialState,
    reducers: {
        postVote: (state: IVoteState) => {
            state.loading = true;
            state.error = false;
            state.data = [];
        },
        postVoteSuccess: (state: IVoteState, action: any) => {
            state.loading = false;
            state.error = false;
            state.data = action.payload;
        },
        postVoteFailure: (state: IVoteState) => {
            state.loading = false;
            state.error = true;
            state.data = [];
        },
    },
});

export const { postVote, postVoteSuccess, postVoteFailure } = postCreateVoteSlice.actions;
export default postCreateVoteSlice.reducer;

export const fetchPostVote = (body: any) => async(
    dispatch: (arg0: {
            payload: any;
            type:
                | "postVote/postVote"
                | "postVote/postVoteSuccess"
                | "postVote/postVoteFailure";
            }) => void 
        ) => {
            dispatch(postVote());
            try {
                const response = await services.postVote(body);
                dispatch(postVoteSuccess(response.data));
            } catch (err) {
                dispatch(postVoteFailure());
            }
        };
