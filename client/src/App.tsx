import { useState } from "react";
import { useGetFootballResultsQuery } from "./services/football";

function App() {
  const [count, setCount] = useState(0);

  const { data, error, isLoading } = useGetFootballResultsQuery();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-thin mt-8 text-center">
        Hello Vite + React!
      </h1>
      <button
        className="mt-4 w-32 px-4 py-2 rounded bg-blue-400 hover:bg-blue-300 transition-colors"
        type="button"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is: {count}
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
