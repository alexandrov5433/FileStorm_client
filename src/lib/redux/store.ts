import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slice/user';
import landingReducer from './slice/landing';
import favoriteUpdateReducer from './slice/favoriteUpdate';

export const store = configureStore({
    reducer: {
        user: userReducer,
        landing: landingReducer,
        favoriteUpdate: favoriteUpdateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch