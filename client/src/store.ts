import { configureStore } from "@reduxjs/toolkit";
import { footballResultsApi } from "./services/football";
import standingsFilterReducer from "./features/football/standingsFilterSlice";

const store = configureStore({
  reducer: {
    [footballResultsApi.reducerPath]: footballResultsApi.reducer,
    standingsFilter: standingsFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(footballResultsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
