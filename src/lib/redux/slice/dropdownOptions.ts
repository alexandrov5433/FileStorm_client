import { createSlice } from "@reduxjs/toolkit";

export const dropdownOptionsSlice = createSlice({
    name: 'dropdownOptions',
    initialState: {
        fileOverviewScrollIndicator: false
    } as {
        fileOverviewScrollIndicator: boolean
    },
    reducers: {
        toggleFileOverviewScrollIndicator: (state) => {
            return {
                ...state,
                fileOverviewScrollIndicator: !state.fileOverviewScrollIndicator
            };
        }
    }
});

export const {
    toggleFileOverviewScrollIndicator
} = dropdownOptionsSlice.actions;
export default dropdownOptionsSlice.reducer;