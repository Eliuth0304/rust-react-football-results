import FootballResults from "./features/football/FootballResults/FootballResults";

const App = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8 font-extralight sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <h1 className="text-4xl font-thin text-center">Football Results</h1>
      <FootballResults />
    </div>
  );
};

export default App;
