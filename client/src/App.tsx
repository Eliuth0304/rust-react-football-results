import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

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
    </div>
  );
}

export default App;
