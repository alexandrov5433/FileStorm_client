import { createSlice } from "@reduxjs/toolkit";
import type { Chunk } from "../../definition/chunk";
import type { Directory } from "../../definition/directory";

type TextInputBoxState = {
    funcToRunOnInputDone: 'addNewDirectory' | 'renameFile'
    funcInputValueValidator?: 'validateFileAndDirName',
    textContent: string,
    textExtraNote?: string,
    btnText: string,
    entityToRename?: Chunk | Directory
} | null;

export const textInputBoxSlice = createSlice({
    name: 'textInputBox',
    initialState: null as TextInputBoxState,
    reducers: {
        openTextInputBox: (_state, action: {payload: TextInputBoxState, type: string}) => {
            return action.payload;
        },
        closeTextInputBox: () => {
            return null;
        }
    }
});

export const {
    openTextInputBox,
    closeTextInputBox
} = textInputBoxSlice.actions;
export default textInputBoxSlice.reducer;