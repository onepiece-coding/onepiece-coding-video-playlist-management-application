import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import videoReducer from "./slices/videoSlice";
import uiReducer from "./slices/uiSlice";
import commentReducer from "./slices/commentSlice";

// Redux Persist configuration for localStorage
const persistConfig = {
  key: "root", // key form the persisted state
  storage, // use localstorage to store our state
  whitelist: ["ui", "comments"], // Only persist these slices
};

// Combine all reducers
const rootReducer = combineReducers({
  videos: videoReducer,
  comments: commentReducer,
  ui: uiReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});

// Create the persistor
export const persistor = persistStore(store);
