import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { increment } from "./features/football/footballSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-thin mt-8 text-center">
        Hello Vite + React!
      </h1>
      <button
        className="mt-4 w-32 px-4 py-2 rounded bg-blue-400 hover:bg-blue-300 transition-colors"
        type="button"
        onClick={() => dispatch(increment())}
      >
        Count is: {count}
      </button>
    </div>
  );
}

export default App;
