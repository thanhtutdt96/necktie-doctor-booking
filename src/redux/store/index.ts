import { configureStore } from "@reduxjs/toolkit";
import { necktieApi } from "redux/services/necktieApi";

export const store = configureStore({
  reducer: {
    [necktieApi.reducerPath]: necktieApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(necktieApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
