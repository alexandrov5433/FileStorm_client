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
        }
    }
});

export const { setUser, setGuest } = userSlice.actions;
export default userSlice.reducer;