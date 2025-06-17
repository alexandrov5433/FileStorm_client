import { createSlice } from "@reduxjs/toolkit";

export const breadcrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState: {
        history: null,
        currentPosition: null,
        windowHistoryLengthOnAppEntry: null
    } as {
        history: Array<[number, string]>[] | null,
        currentPosition: number | null,
        windowHistoryLengthOnAppEntry: number | null
    },
    reducers: {
        setWindowHistoryLengthOnAppEntry: (state, action: {payload: number, type: string}) => {
            return {
                ...state,
                windowHistoryLengthOnAppEntry: action.payload
            };
        },
        initHistory: (state, action: { payload: Array<[number, string]>, type: string }) => {
            return {
                ...state,
                history: [action.payload],
                currentPosition: 0
            }
        },
        pushToHistory: (state, action: { payload: Array<[number, string]>, type: string }) => {
            const newHistory = [...state.history || [], action.payload];
            return {
                ...state,
                history: newHistory,
                currentPosition: newHistory.length - 1
            };
        },
        goBackOne: (state) => {
            return {
                ...state,
                history: state.history,
                currentPosition: (state.currentPosition || 1) - 1
            };
        },
        goForwardOne: (state) => {
            return {
                ...state,
                history: state.history,
                currentPosition: (state.currentPosition || 0) + 1
            };
        },
    },
});

export const {
    setWindowHistoryLengthOnAppEntry,
    initHistory,
    pushToHistory,
    goBackOne,
    goForwardOne
} = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;