import { useGetFootballResultsQuery } from "../../services/football";
import Standings from "./Standings";
import dayjs from "dayjs";
import LastUpdated from "./LastUpdated";

function FootballResults() {
  const { data: results, isLoading } = useGetFootballResultsQuery();

  if (results === undefined) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { standings } = results;

  const lastUpdatedDate = standings
    .map(({ update }) => dayjs(update))
    .reduce((lastUpdatedDate, date) => dayjs.max(lastUpdatedDate, date));

  return (
    <>
      <div className="mt-8 flex flex-col w-full border border-gray-700 rounded divide-y divide-gray-700">
        <div className=" gap-2 flex divide-x divide-gray-700">
          <div className="p-4 flex grow justify-center items-center">
            <img className="h-8" src={results.logo} />
            <p className="ml-4 text-2xl">{results.name}</p>
          </div>
          <div className="px-4 flex items-center">
            <p className="font-bold">Season: {results.season}</p>
          </div>
        </div>
        <Standings standings={standings} />
      </div>
      <LastUpdated date={lastUpdatedDate} />
    </>
  );
}

export default FootballResults;
