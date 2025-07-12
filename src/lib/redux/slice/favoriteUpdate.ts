import { createSlice } from "@reduxjs/toolkit";

export const favoriteUpdateSlice = createSlice({
    name: 'favoriteUpdate',
    initialState: {
        updateType: 'add',
        chunks: null
    } as {
        updateType: 'add' | 'remove',
        chunks: number[] | null
    },
    reducers: {
        chunksAddedToFav: (state, action: { payload: number[], type: string }) => {
            state.updateType = 'add';
            state.chunks = action.payload;
        },
        chunksRemovedFromFav: (state, action: { payload: number[], type: string }) => {
            state.updateType = 'remove';
            state.chunks = action.payload;
        }
    }
});

export const { chunksAddedToFav, chunksRemovedFromFav } = favoriteUpdateSlice.actions;
export default favoriteUpdateSlice.reducer;