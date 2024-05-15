import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import authReducer from "./slices/auth";

const rootPersistConfig = {
    key: "root",
    storage: storage,
    keyPrefix: "redux-persist",
};

const rootReducer = combineReducers({
    auth: authReducer,
});

//create a store and give it reducers
export const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

const persistor = persistStore(store);

export {persistor};
