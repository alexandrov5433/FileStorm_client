import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../definition/user";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: 0,
        username: '',
        email: '',
        max_storage_space: 0,
        bytes_in_storage: 0
    } as User,
    reducers: {
        setUser: (state, action: { payload: User, type: string }) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.max_storage_space = action.payload.max_storage_space;
            state.bytes_in_storage = action.payload.bytes_in_storage;
        },
        setGuest: (state) => {
            state.id = 0,
            state.username = '',
            state.email = '',
            state.max_storage_space = 0,
            state.bytes_in_storage = 0
        }
    }
});

export const { setUser, setGuest } = userSlice.actions;
export default userSlice.reducer;