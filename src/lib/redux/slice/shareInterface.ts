import { createSlice } from "@reduxjs/toolkit";
import type { Chunk } from "../../definition/chunk";


export const shareInterfaveSlice = createSlice({
    name: 'shareInterface',
    initialState: null as null | {
        entity: Chunk
    },
    reducers: {
        initShareInterfaceWithEntity: (state, action: {payload: Chunk, type: string}) => {
            return {
                ...state,
                entity: action.payload
            };
        },
        setShareInterfaceStateToNull: () => {
            return null;
        }
    }
});

export const {
    initShareInterfaceWithEntity,
    setShareInterfaceStateToNull
} = shareInterfaveSlice.actions;
export default shareInterfaveSlice.reducer;