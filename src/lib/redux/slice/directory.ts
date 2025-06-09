import { createSlice } from "@reduxjs/toolkit";
import type { HydratedDirectoryReference } from "../../definition/hydratedDirectoryReference";
import type { Chunk } from "../../definition/chunk";

export const directorySlice = createSlice({
    name: 'directory',
    initialState: {
        dirPath: [],
        newlyDeletedDir: {
            dirPath: [],
            dirName: ''
        },
        newlyAddedDirRef: null,
        newlyDeletedFile: null,
        newlyAddedFile: null
    } as {
        dirPath: Array<number | string>,
        newlyDeletedDir: {
            dirPath: Array<number | string>,
            dirName: string
        },
        newlyAddedDirRef: HydratedDirectoryReference | null,
        newlyDeletedFile: Chunk | null,
        newlyAddedFile: Chunk | null
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
        setNewlyAddedDirRef: (state, action: { payload: HydratedDirectoryReference, type: string }) => {
            state.newlyAddedDirRef = action.payload;
        },
        setNewlyDeletedFile: (state, action: { payload: Chunk, type: string }) => {
            state.newlyDeletedFile = action.payload;
        },
        setNewAddedFile: (state, action: { payload: Chunk, type: string }) => {
            state.newlyAddedFile = action.payload;
        }
    }
});

export const {
    setDirPath,
    setNewlyDeleteDir,
    setNewlyAddedDirRef,
    setNewlyDeletedFile,
    setNewAddedFile
} = directorySlice.actions;
export default directorySlice.reducer;