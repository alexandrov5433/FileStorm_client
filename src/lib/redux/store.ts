import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slice/user';
import landingReducer from './slice/landing';
import favoriteUpdateReducer from './slice/favoriteUpdate';
import directorySlice from './slice/directory';
import uploadProgressReducer from './slice/uploadProgress';
import messengerReducer from './slice/messenger';
import breadcrunbsReducer from './slice/breadcrumbs';
import checkedEntitiesReducer from './slice/checkedEntities';
import shareInterfaceReducer from './slice/shareInterface';
import textInputBoxReducer from './slice/textInputBox';
import fileStorageScrollReducer from './slice/fileStorageScroll';
import dropdownOptionsReducer from './slice/dropdownOptions';

export const store = configureStore({
    reducer: {
        user: userReducer,
        landing: landingReducer,
        favoriteUpdate: favoriteUpdateReducer,
        directory: directorySlice,
        uploadProgress: uploadProgressReducer,
        messenger: messengerReducer,
        breadcrumbs: breadcrunbsReducer,
        checkedEntities: checkedEntitiesReducer,
        shareInterface: shareInterfaceReducer,
        textInputBox: textInputBoxReducer,
        fileStorageScroll: fileStorageScrollReducer,
        dropdownOptions: dropdownOptionsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch