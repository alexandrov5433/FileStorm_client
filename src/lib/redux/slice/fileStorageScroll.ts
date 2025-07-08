import { createSlice } from "@reduxjs/toolkit";

export const fileStorageScrollSlice = createSlice({
    name: 'fileStorageScroll',
    initialState: null as {
        scrollTargetId: string
    } | null,
    reducers: {
        setScrollTargetInFileStorage: (state, action: {payload: string, type: string}) => {
            return {
                ...state,
                scrollTargetId: action.payload
            };
        }   
    }
});

export const {
    setScrollTargetInFileStorage
} = fileStorageScrollSlice.actions;
export default fileStorageScrollSlice.reducer;