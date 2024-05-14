import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, Candidate} from '../../Types/Types';

const initialState: RootState = {
    selectedCandidates: [],
};

const getCandidatesSlice = createSlice({
    name: 'getListCandidates',
    initialState,
    reducers: {
        selectCandidate(state, action: PayloadAction<any>) {
            state.selectedCandidates.push(action.payload);
        },
        removeCandidate(state, action: PayloadAction<number>) {
            state.selectedCandidates.splice(action.payload, 1);
        },
        removeAllCandidates(state) {
            state.selectedCandidates = [];
        },
    },
});

export const { selectCandidate, removeCandidate, removeAllCandidates } = getCandidatesSlice.actions;

export const fetchSelectCandidate =
    (data: any) => async (dispatch: (arg0: { payload: any }) => void) => {
        dispatch(selectCandidate(data));
    };

export default getCandidatesSlice.reducer;
