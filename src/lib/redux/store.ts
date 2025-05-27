import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slice/user';
import landingReducer from "./slice/landing";

export const store = configureStore({
    reducer: {
        user: userReducer,
        landing: landingReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch