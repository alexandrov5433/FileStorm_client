import { createSlice } from "@reduxjs/toolkit";
import type { CheckedEntitiesRenderOptions, CheckedEntityActionPayload } from "../../definition/checkedEntitiesOptionsTypes";

export const checkedEntitiesSlice = createSlice({
    name: 'checkedEntities',
    initialState: {
        checkedList: [],
        checkedTypedEntities: [],
        renderOptions: {
            delete: true,
            download: true
        }
    } as {
        checkedList: Array<number>,
        checkedTypedEntities: Array<CheckedEntityActionPayload>,
        renderOptions: CheckedEntitiesRenderOptions
    },
    reducers: {
        addEntityToCheckedList: (state, action: { payload: CheckedEntityActionPayload, type: string }) => {
            const newCheckedList = [...state.checkedList];
            if (!newCheckedList.includes(action.payload.entityId)) {
                newCheckedList.push(action.payload.entityId);
            }

            const newCheckedTypedEntities = [...state.checkedTypedEntities];
            if (!newCheckedTypedEntities.find(e => e.entityId === action.payload.entityId)) {
                newCheckedTypedEntities.push(action.payload);
            }

            return {
                ...state,
                checkedList: newCheckedList,
                checkedTypedEntities: newCheckedTypedEntities
            }
        },
        deleteEntityFromCheckedList: (state, action: { payload: CheckedEntityActionPayload, type: string }) => {
            return {
                ...state,
                checkedList: state.checkedList.filter(e => e != action.payload.entityId),
                checkedTypedEntities: state.checkedTypedEntities.filter(e => e.entityId != action.payload.entityId)
            }
        },
        clearCheckedList: (state) => {
            return {
                ...state,
                checkedList: [],
                checkedTypedEntities: []
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