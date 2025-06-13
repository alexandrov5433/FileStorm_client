import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slice/user';
import landingReducer from './slice/landing';
import favoriteUpdateReducer from './slice/favoriteUpdate';
import directorySlice from './slice/directory';
import uploadProgressReducer from './slice/uploadProgress';
import messengerReducer from './slice/messenger';

export const store = configureStore({
    reducer: {
        user: userReducer,
        landing: landingReducer,
        favoriteUpdate: favoriteUpdateReducer,
        directory: directorySlice,
        uploadProgress: uploadProgressReducer,
        messenger: messengerReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch