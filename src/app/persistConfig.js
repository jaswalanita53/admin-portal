import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Storage mechanism (e.g., local storage)

import counterReducer from "../features/counter/counterSlice";

const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Storage mechanism
  // Optionally, you can whitelist or blacklist specific reducers
  // whitelist: ['auth'], // Persist only 'auth' reducer
  // blacklist: ['cart'], // Exclude 'cart' reducer from persistence
};

const persistedReducer = persistReducer(persistConfig, counterReducer);

export { persistedReducer };
