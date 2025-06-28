import { createSlice } from "@reduxjs/toolkit";
import type { Chunk } from "../../definition/chunk";
import type { Directory } from "../../definition/directory";

type ChunkReplacementActionPayload = {
    idOfChunkToRemove: number,
    chunkToAdd: Chunk
}

const directorySliceInitialState = {
    dirPath: [],
    subdirectories: [],
    hydratedChunks: [],
    newlyDeletedSubdirId: null,
    newlyDeletedChunkId: null
} as {
    dirPath: Array<[number, string]>,
    subdirectories: Directory[],
    hydratedChunks: Chunk[],
    newlyDeletedSubdirId: number | null,
    newlyDeletedChunkId: number | null,
};

export const directorySlice = createSlice({
    name: 'directory',
    initialState: directorySliceInitialState,
    reducers: {
        setDirPath: (state, action: { payload: Array<[number, string]>, type: string }) => {
            return { ...state, dirPath: action.payload };
        },
        setDirPathToInitialState: () => {
            return directorySliceInitialState;
        },

        // subdirectories
        setSubdirectories: (state, action: { payload: Directory[], type: string }) => {
            return { ...state, subdirectories: action.payload };
        },
        addSubdir: (state, action: { payload: Directory, type: string }) => {
            return { ...state, subdirectories: [...state.subdirectories, action.payload] };
        },
        removeSubdirById: (state, action: { payload: number, type: string }) => {
            const updatedDirectories = state.subdirectories.filter(d => d.id !== action.payload);
            return { ...state, subdirectories: updatedDirectories, newlyDeletedSubdirId: action.payload };
        },

        // chunks
        setHydratedChunks: (state, action: { payload: Chunk[], type: string }) => {
            return { ...state, hydratedChunks: action.payload };
        },
        addChunk: (state, action: { payload: Chunk, type: string }) => {
            return { ...state, hydratedChunks: [...state.hydratedChunks, action.payload] };
        },
        removeChunkById: (state, action: { payload: number, type: string }) => {
            const updatedChunks = state.hydratedChunks.filter(c => c.id !== action.payload);
            return { ...state, hydratedChunks: updatedChunks, newlyDeletedChunkId: action.payload };
        },
        replaceChunkByIdWithNewChunk: (state, action: { payload: ChunkReplacementActionPayload, type: string }) => {
            let indexOfTarget = state.hydratedChunks.findIndex(c => c.id === action.payload.idOfChunkToRemove);
            if (indexOfTarget < 0) {
                // case -1
                return state;
            }
            const updatedChunks = [...state.hydratedChunks]
            updatedChunks[indexOfTarget] = action.payload.chunkToAdd;

            return {
                ...state,
                hydratedChunks: updatedChunks
            };
        }

    }
});

export const {
    setDirPath,
    setDirPathToInitialState,
    removeSubdirById,
    addSubdir,
    removeChunkById,
    addChunk,
    setSubdirectories,
    setHydratedChunks,
    replaceChunkByIdWithNewChunk
} = directorySlice.actions;
export default directorySlice.reducer;