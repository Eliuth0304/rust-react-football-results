import { useGetFootballResultsQuery } from "./services/football";

function App() {
  const { data, error, isLoading } = useGetFootballResultsQuery();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-thin mt-8 text-center">Football Results</h1>
      {data !== undefined && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;
