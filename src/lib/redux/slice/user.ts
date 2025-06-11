import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../definition/user";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: 0,
        username: '',
        email: '',
        maxStorageSpace: 0,
        bytesInStorage: 0
    } as User,
    reducers: {
        setUser: (state, action: { payload: User, type: string }) => {
            return action.payload;
        },
        setGuest: (state) => {
            return {
                id: 0,
                username: '',
                email: '',
                maxStorageSpace: 0,
                bytesInStorage: 0
            };
        }
    }
});

export const { setUser, setGuest } = userSlice.actions;
export default userSlice.reducer;