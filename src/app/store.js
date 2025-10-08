import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import {
  composeWithDevToolsLogOnlyInProduction,
  composeWithDevTools,
  composeWithDevToolsDevelopmentOnly,
} from "@redux-devtools/extension";
import { combineReducers } from "redux-seamless-immutable";
import counterReducer from "../features/counter/counterSlice";
import nameReducer from "../features/name/nameSlice";
import ageReducer from "../features/age/ageSlice";
import gradeReducer from "../features/grade/gradeSlice";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { mapObjIndexed } from "ramda";
import registerFilter from "./register-filter";
import rehydrateFilter from "./rehydrate-filter";
import blacklist from "./blacklist";
import tempReducer from "./reducer";

import logger from "redux-logger";
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

const mapReducers = mapObjIndexed(combineReducers);

var { hostname } = window.location;
var subdomain = hostname.split(".")[0];

const defaultMiddlewareOptions = {
  thunk: false,
  immutableCheck: true,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const enhanceWithDevTools = composeWithDevToolsDevelopmentOnly({
  actionsDenylist: blacklist,
  name: `channel-shell-${subdomain}`,
  maxAge: 200,
});

const localPersistConfig = {
  key: "local",
  storage,
  stateReconciler: autoMergeLevel2,
  debug: true,
  version: 1, // version of persisted reducer
  migrate: (state, version) => {
    const {
      _persist: { version: persistedVersion },
    } = state;
    
    // return here the state depending on reducer version, persisted version and persisted state
    return Promise.resolve(state);
  },
};

const dynamicLocalPersistConfig = {
  key: "dynamicLocal",
  storage,
  stateReconciler: autoMergeLevel2,
  debug: true,
};

const sessionPersistConfig = {
  key: "session",
  storage: storageSession,
};

const cookiesPersistConfig = {
  key: "cookies",
  storage: new CookieStorage(Cookies),
};

const intermediaryReducer = (config, baseReducer) => {
  const { key } = config;
  const newReducer = (state, action) => {
    if (action.type === "WS" && action.key === key) {
      return action.payload
        ? {
            ...state,
            ...action.payload,
          }
        : baseReducer(undefined, action);
    }
    return baseReducer(state, action);
  };

  return persistReducer(config, newReducer);
};

const counterPersistedReducer = intermediaryReducer(
  localPersistConfig,
  counterReducer
);
const namePersistedReducer = intermediaryReducer(
  sessionPersistConfig,
  nameReducer
);
const agePersistedReducer = intermediaryReducer(
  cookiesPersistConfig,
  ageReducer
);

const staticReducers = {
  counter: counterPersistedReducer,
  name: namePersistedReducer,
  age: agePersistedReducer,
  grade: gradeReducer,
};

const rootReducer = (additionalReducers) =>
  combineReducers({
    ...staticReducers,
    ...additionalReducers,
  });

const middlewares = (getDefaultMiddleware) =>
  getDefaultMiddleware(defaultMiddlewareOptions).concat(
    logger,
    rehydrateFilter,
    reduxImmutableStateInvariant()
  );

export const store = configureStore({
  reducer: rootReducer(),
  middleware: middlewares,
  devTools: true,
});

// const middleware2 = (getDefaultMiddleware) =>
// getDefaultMiddleware({
//   serializableCheck: {
//     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   },
// }).concat(logger, reduxImmutableStateInvariant())

// export const store2 = configureStore({
//   reducer: rootReducer(),
//   middleware: middleware2,
//   devTools:{
//     actionsDenylist: blacklist,
//     name: 'channel-shell',
//     maxAge: 200,
//   }
// });

// export const store1 = configureStore({
//   reducer: rootReducer(),
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(rehydrateFilter, logger, reduxImmutableStateInvariant()),
// });

// export const persistorStore = persistStore(store);

export const persistorStore = persistStore(
  store,
  {
    enhancer: applyMiddleware(registerFilter, rehydrateFilter, logger),
    manualPersist: false,
  },
  () => console.error("hydrated")
);

// const getPersistorStore = () => persistStore(store,{
//   enhancer: applyMiddleware(registerFilter, rehydrateFilter, logger),
//   manualPersist: true,
// });

// export const recreatePersistorStore = () => {
//   persistorStore = getPersistorStore()
// }

// recreatePersistorStore()

const getRandom = () => Math.round(Math.random() * 1000);
store.additionalReducers = {};

const key1Reducer = (state = { value: "" }, action) => {
  switch (action.type) {
    case "addReducerValue":
      return { value: action.payload };
    default:
      return state;
  }
};

const dynamicReducer = (state = { value: "" }, action) => {
  switch (action.type) {
    case "addReducerValue":
      return { value: action.payload };
    default:
      return state;
  }
};

const dynamicPersistedReducer = intermediaryReducer(
  dynamicLocalPersistConfig,
  dynamicReducer
);

store.injectReducer = (key, additionalReducer) => {
  // store.additionalReducers['client'] = {
  //   ...store.additionalReducers['client'],
  //   [key]: additionalReducer
  // }

  store.additionalReducers["client"] = {
    [`test_${getRandom()}`]: dynamicPersistedReducer,
  };

  const rd = (s = {}, a) => s;
  const mapedReducers = mapReducers({ ...store.additionalReducers });
  const newReducers = rootReducer(mapedReducers);
  store.replaceReducer(newReducers);
  // persistorStore.persist()
};

export const addReducer = (key, additionalReducer) => {
  // additionalReducers[key]=additionalReducer
  store.injectReducer(key, additionalReducer);
  //persistorStore.persist()
};

// generate watch file change functiion
