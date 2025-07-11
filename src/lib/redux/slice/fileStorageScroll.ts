import { createSlice } from "@reduxjs/toolkit";

export const fileStorageScrollSlice = createSlice({
    name: 'fileStorageScroll',
    initialState: {
        signalScroll: false,
        scrollTargetId: ''
    } as {
        signalScroll: boolean,
        scrollTargetId: string
    },
    reducers: {
        setScrollTargetInFileStorage: (state, action: { payload: string, type: string }) => {
            return {
                ...state,
                signalScroll: true,
                scrollTargetId: action.payload
            };
        },
        setScrollFinished: (state) => {
            return {
                ...state,
                signalScroll: false,
                scrollTargetId: ''
            };
        }
    }
});

export const {
    setScrollTargetInFileStorage,
    setScrollFinished
} = fileStorageScrollSlice.actions;
export default fileStorageScrollSlice.reducer;