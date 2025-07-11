import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        signalClearSearchResults: false
    } as {
        signalClearSearchResults: boolean
    },
    reducers: {
        triggerClearSearchResults: (state) => {
            return {
                ...state,
                signalClearSearchResults: !state.signalClearSearchResults
            };
        }
    }
});

export const {
    triggerClearSearchResults
} = searchSlice.actions;
export default searchSlice.reducer;