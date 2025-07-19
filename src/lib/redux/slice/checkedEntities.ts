import { createSlice } from "@reduxjs/toolkit";
import type { CheckedEntitiesRenderOptions, CheckedEntityActionPayload } from "../../definition/checkedEntitiesOptionsTypes";

export const checkedEntitiesSlice = createSlice({
    name: 'checkedEntities',
    initialState: {
        checkedTypedEntities: [],
        renderOptions: {
            delete: true,
            download: true
        }
    } as {
        checkedTypedEntities: Array<CheckedEntityActionPayload>,
        renderOptions: CheckedEntitiesRenderOptions
    },
    reducers: {
        addEntityToCheckedList: (state, action: { payload: CheckedEntityActionPayload, type: string }) => {
            const newCheckedTypedEntities = [...state.checkedTypedEntities];
            if (!newCheckedTypedEntities.find(e => e.entityId === action.payload.entityId && e.entityType === action.payload.entityType)) {
                newCheckedTypedEntities.push(action.payload);
            }

            return {
                ...state,
                checkedTypedEntities: newCheckedTypedEntities
            }
        },
        deleteEntityFromCheckedList: (state, action: { payload: CheckedEntityActionPayload, type: string }) => {
            return {
                ...state,
                checkedTypedEntities: state.checkedTypedEntities.reduce((acc, cur) => {
                    if (cur.entityId === action.payload.entityId && cur.entityType === action.payload.entityType) {
                        return acc;
                    }
                    acc.push(cur);
                    return acc;
                }, [] as Array<CheckedEntityActionPayload>)
            }
        },
        clearCheckedList: (state) => {
            return {
                ...state,
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