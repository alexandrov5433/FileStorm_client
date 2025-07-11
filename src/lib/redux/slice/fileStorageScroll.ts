import { createSlice } from "@reduxjs/toolkit";

export const fileStorageScrollSlice = createSlice({
    name: 'fileStorageScroll',
    initialState: {
        scrollTargetId: ''
    } as {
        scrollTargetId: string
    },
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