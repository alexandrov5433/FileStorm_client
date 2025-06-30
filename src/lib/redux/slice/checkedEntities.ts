import { createSlice } from "@reduxjs/toolkit";
import type { CheckedEntitiesRenderOptions } from "../../definition/checkedEntitiesOptionsTypes";

export const checkedEntitiesSlice = createSlice({
    name: 'checkedEntities',
    initialState: {
        checkedList: [],
        renderOptions: {
            delete: true,
            download: true
        }
    } as {
        checkedList: Array<number>,
        renderOptions: CheckedEntitiesRenderOptions
    },
    reducers: {
        addEntityToCheckedList: (state, action: { payload: number, type: string }) => {
            const newCheckedList = [...state.checkedList];
            if (!newCheckedList.includes(action.payload)) {
                newCheckedList.push(action.payload);
            }
            return {
                ...state,
                checkedList: newCheckedList
            }
        },
        deleteEntityFromCheckedList: (state, action: { payload: number, type: string }) => {
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
        },
        setCheckedEntitiesRenderOptions: (state, action: { payload: CheckedEntitiesRenderOptions, type: string }) => {
            return {
                ...state,
                renderOptions: action.payload
            }
        }
    }
});

export const {
    addEntityToCheckedList,
    deleteEntityFromCheckedList,
    clearCheckedList,
    setCheckedEntitiesRenderOptions
} = checkedEntitiesSlice.actions;
export default checkedEntitiesSlice.reducer;