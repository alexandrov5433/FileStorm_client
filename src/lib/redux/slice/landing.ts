import { createSlice } from "@reduxjs/toolkit";

export const landingSlice = createSlice({
    name: 'landing',
    initialState: {
        isMounted: false
    },
    reducers: {
        setLandingMounted: (state, action: { payload: boolean, type: string}) => {
            state.isMounted = action.payload;
        }
    }
});

export const { setLandingMounted } = landingSlice.actions;
export default landingSlice.reducer;