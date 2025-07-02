import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../definition/user";

export const userSlice = createSlice({
    name: 'user',
    initialState: null as User | null,
    reducers: {
        setUser: (_state, action: { payload: User, type: string }) => {
            return action.payload;
        },
        setGuest: (_state) => {
            return null;
        },
        addBytesInStorage: (state, action: { payload: number, type: string }) => {
            if (!state) return state;
            return {
                ...state,
                bytesInStorage: (state?.bytesInStorage || 0) + action.payload
            }
        },
        removeBytesInStorage: (state, action: { payload: number, type: string }) => {
            if (!state) return state;
            let newVal = (state?.bytesInStorage || 0) - action.payload;
            if (newVal < 0) {
                newVal = 0;
            }
            return {
                ...state,
                bytesInStorage: newVal
            }
        }
    }
});

export const {
    setUser,
    setGuest,
    addBytesInStorage,
    removeBytesInStorage
} = userSlice.actions;
export default userSlice.reducer;