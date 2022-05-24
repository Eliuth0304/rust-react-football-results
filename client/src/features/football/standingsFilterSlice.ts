import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StandingsFilter = "all" | "away" | "home";

const initialState = "all" as StandingsFilter;

export const standingsFilterSlice = createSlice({
  name: "standingsFilter",
  initialState,
  reducers: {
    setStandingsFilter: (
      _state,
      { payload: newFilter }: PayloadAction<StandingsFilter>
    ) => {
      return newFilter;
    },
  },
});

export const {
  actions: { setStandingsFilter },
} = standingsFilterSlice;

export default standingsFilterSlice.reducer;
