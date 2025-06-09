import { createSlice } from "@reduxjs/toolkit";
import type { UploadProgressEntity } from "../../definition/redux";

export const uploadProgressSlice = createSlice({
    name: 'uploadProgress',
    initialState: [] as UploadProgressEntity[],
    reducers: {
        addUploadEntity: (state, action: { payload: UploadProgressEntity, type: string }) => {
            return [...state, action.payload];
        },
        removeUploadEntityById: (state, action: { payload: number, type: string }) => {
            return state.reduce((acc, cur) => {
                if (cur.id != action.payload) {
                    acc.push(cur);
                }
                return acc;
            }, [] as UploadProgressEntity[]);
        },
        updateUploadEntityById: (state, action: { payload: { id: number, progress: number, actionInProgress: string }, type: string }) => {
            return state.reduce((acc, cur) => {
                if (cur.id == action.payload.id) {
                    acc.push({
                        ...cur,
                        progress: action.payload.progress,
                        actionInProgress: action.payload.actionInProgress
                    });
                } else {
                    acc.push(cur);
                }
                return acc;
            }, [] as UploadProgressEntity[]);
        }
    }
});

export const {
    addUploadEntity,
    removeUploadEntityById,
    updateUploadEntityById
} = uploadProgressSlice.actions;
export default uploadProgressSlice.reducer;