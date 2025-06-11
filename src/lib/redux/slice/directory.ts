import { createSlice } from "@reduxjs/toolkit";
import type { Chunk } from "../../definition/chunk";
import type { Directory } from "../../definition/directory";

export const directorySlice = createSlice({
    name: 'directory',
    initialState: {
        dirPath: [],
        newlyDeletedDirId: null,
        newlyAddedDir: null,
        newlyDeletedFileId: null,
        newlyAddedFile: null
    } as {
        dirPath: Array<[number, string]>,
        newlyDeletedDirId: number | null,
        newlyAddedDir: Directory | null,
        newlyDeletedFileId: number | null,
        newlyAddedFile: Chunk | null
    },
    reducers: {
        setDirPath: (state, action: { payload: Array<[number, string]>, type: string }) => {
            return { ...state, dirPath: action.payload };
        },
        setNewlyDeleteDirId: (state, action: { payload: number, type: string }) => {
            return { ...state, newlyDeletedDirId: action.payload };
        },
        setNewlyAddedDir: (state, action: { payload: Directory, type: string }) => {
            return { ...state, newlyAddedDir: action.payload };
        },
        setNewlyDeletedFileId: (state, action: { payload: number, type: string }) => {
            return { ...state, newlyDeletedFileId: action.payload };
        },
        setNewAddedFile: (state, action: { payload: Chunk, type: string }) => {
            return { ...state, newlyAddedFile: action.payload };
        }
    }
});

export const {
    setDirPath,
    setNewlyDeleteDirId,
    setNewlyAddedDir,
    setNewlyDeletedFileId,
    setNewAddedFile
} = directorySlice.actions;
export default directorySlice.reducer;