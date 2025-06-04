import { createSlice } from "@reduxjs/toolkit";
import type { Chunk } from "../../definition/chunk";

export const favoriteUpdateSlice = createSlice({
    name: 'favoriteUpdate',
    initialState: {
        updateType: 'add',
        chunk: null
    } as {
        updateType: 'add' | 'remove',
        chunk: Chunk | null
    },
    reducers: {
        chunkAddedToFav: (state, action: { payload: Chunk, type: string }) => {
            state.updateType = 'add';
            state.chunk = action.payload;
        },
        chunkRemovedFromFav: (state, action: { payload: Chunk, type: string }) => {
            state.updateType = 'remove';
            state.chunk = action.payload;
        }
    }
});

export const { chunkAddedToFav, chunkRemovedFromFav} = favoriteUpdateSlice.actions;
export default favoriteUpdateSlice.reducer;