import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./persistConfig";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import { createStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

const store = configureStore({
  reducer: {
    counter: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export { store, persistor };
