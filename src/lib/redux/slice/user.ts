import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../definition/user";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: 0,
        username: ''
    } as User,
    reducers: {
        setUser: (state, action: {payload: User, type: string}) => {            
            state.id = action.payload.id;
            state.username = action.payload.username;
        },
        setGuest: (state) => {
            state.id = 0;
            state.username = '';
        }
    }
});

export const { setUser, setGuest} = userSlice.actions;
export default userSlice.reducer;