import { createSlice } from "@reduxjs/toolkit";

export const checkedEntitiesSlice = createSlice({
    name: 'checkedEntities',
    initialState: {
        checkedList: []
    } as {
        checkedList: Array<number>
    },
    reducers: {
        addEntityToCheckedList: (state, action:  {payload: number, type: string}) => {
            const newCheckedList = [...state.checkedList];
            if (!newCheckedList.includes(action.payload)) {
                newCheckedList.push(action.payload);
            }
            return {
                ...state,
                checkedList: newCheckedList
            }
        },
        deleteEntityFromCheckedList: (state, action:  {payload: number, type: string}) => {
            return {
                ...state,
                checkedList: state.checkedList.filter(e => e != action.payload)
            }
        },
        clearCheckedList: (state) => {
            return {
                ...state,
                checkedList: []
            }
        }
    }
});

export const {
    addEntityToCheckedList,
    deleteEntityFromCheckedList,
    clearCheckedList
} = checkedEntitiesSlice.actions;
export default checkedEntitiesSlice.reducer;