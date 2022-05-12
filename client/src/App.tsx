import FootballResults from "./features/football/FootballResults";

function App() {
  return (
    <div className="px-32 flex flex-col items-center bg-gradient-to-br from-cyan-100 to-blue-100 font-extralight">
      <h1 className="text-4xl font-thin mt-8 text-center">Football Results</h1>
      <FootballResults />
    </div>
  );
}

export default App;
