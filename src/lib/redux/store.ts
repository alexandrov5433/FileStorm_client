import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slice/user';
import landingReducer from './slice/landing';
import favoriteUpdateReducer from './slice/favoriteUpdate';
import directorySlice from "./slice/directory";

export const store = configureStore({
    reducer: {
        user: userReducer,
        landing: landingReducer,
        favoriteUpdate: favoriteUpdateReducer,
        directory: directorySlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch