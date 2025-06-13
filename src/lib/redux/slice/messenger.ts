import { createSlice } from "@reduxjs/toolkit";

type Message = {
    title: string,
    text: string,
    type: 'positive' | 'negative',
    duration?: number
} | null;

export const messengerSlice = createSlice({
    name: 'messenger',
    initialState: {
        message: null
    } as {
        message: Message
    },
    reducers: {
        setMessage: (state, action: { payload: Message, type: string }) => {
            return { ...state, message: action.payload };
        }
    }
});

export const { setMessage } = messengerSlice.actions;
export default messengerSlice.reducer;