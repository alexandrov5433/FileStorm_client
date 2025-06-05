import { createSlice } from "@reduxjs/toolkit";
import type { HydratedDirectoryReference } from "../../definition/hydratedDirectoryReference";

export const directorySlice = createSlice({
    name: 'directory',
    initialState: {
        dirPath: [],
        newlyDeletedDir: {
            dirPath: [],
            dirName: ''
        },
        newlyAddedDirRef: null
    } as {
        dirPath: Array<number | string>,
        newlyDeletedDir: {
            dirPath: Array<number | string>,
            dirName: string
        },
        newlyAddedDirRef: HydratedDirectoryReference | null
    },
    reducers: {
        setDirPath: (state, action: { payload: Array<number | string>, type: string }) => {
            state.dirPath = action.payload;
        },
        setNewlyDeleteDir: (state, action: {
            payload: {
                dirPath: Array<number | string>,
                dirName: string
            }, type: string
        }) => {
            state.newlyDeletedDir = action.payload;
        },
        setNewlyAddedDirRef: (state, action: {payload: HydratedDirectoryReference, type: string}) => {
            state.newlyAddedDirRef = action.payload;
        }
    }
});

export const { setDirPath, setNewlyDeleteDir, setNewlyAddedDirRef } = directorySlice.actions;
export default directorySlice.reducer;