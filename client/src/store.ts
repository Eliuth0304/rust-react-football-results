import { configureStore } from "@reduxjs/toolkit";
import { footballResultsApi } from "./services/football";

const store = configureStore({
  reducer: {
    [footballResultsApi.reducerPath]: footballResultsApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
