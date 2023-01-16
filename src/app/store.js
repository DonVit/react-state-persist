import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import nameReducer from "../features/name/nameSlice";
import ageReducer from "../features/age/ageSlice";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'

import logger from 'redux-logger'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const localPersistConfig = {
  key: "local",
  storage,
};

const sessionPersistConfig = {
  key: "session",
  storage: storageSession,
};

const cookiesPersistConfig = {
  key: "cookies",
  storage: new CookieStorage(Cookies),
};

const counterPersistedReducer = persistReducer(localPersistConfig, counterReducer);
const namePersistedReducer = persistReducer(sessionPersistConfig, nameReducer)
const agePersistedReducer = persistReducer(cookiesPersistConfig, ageReducer)

const rootReducer = combineReducers({ 
  counter: counterPersistedReducer,
  name: namePersistedReducer,
  age: agePersistedReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistorStore = persistStore(store);
