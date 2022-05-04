import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    increment: (state) => {
      state.value += 1;
    },
    incrementBy: (state, { payload: amount }: PayloadAction<number>) => {
      state.value += amount;
    },
  },
});

const { actions, reducer } = counterSlice;

export const { decrement, increment, incrementBy } = actions;

export default reducer;
