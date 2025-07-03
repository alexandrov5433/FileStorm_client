import { createSlice } from "@reduxjs/toolkit";

type TextInputBoxState = {
    funcToRunOnInputDone: Function
    funcInputValueValidator?: (arg: any) => boolean,
    textContent: string,
    textExtraNote?: string,
    btnText: string,
} | null;

export const textInputBoxSlice = createSlice({
    name: 'textInputBox',
    initialState: null as TextInputBoxState,
    reducers: {
        openTextInputBox: (state, action: {payload: TextInputBoxState, type: string}) => {
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