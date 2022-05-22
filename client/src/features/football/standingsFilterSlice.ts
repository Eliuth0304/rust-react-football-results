import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../reduxHooks";

export enum StandingsFilter {
  Away = "away",
  Home = "home",
  Overall = "overall",
}

const initialState = StandingsFilter.Overall;

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
