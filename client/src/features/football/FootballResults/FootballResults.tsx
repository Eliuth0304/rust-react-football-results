import { useGetFootballResultsQuery } from "../../../services/football";
import Standings from "../Standings/Standings";
import dayjs from "dayjs";
import LastUpdated from "../LastUpdated";
import FootballResultsHeader from "./FootballResultsHeader/FootballResultsHeader";

const FootballResults = () => {
  const { data: results, isLoading } = useGetFootballResultsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (results === undefined) {
    return null;
  }

  const { standings } = results;

  const lastUpdatedDate = standings
    .map(({ update }) => dayjs(update))
    .reduce((lastUpdatedDate, date) => dayjs.max(lastUpdatedDate, date));

  return (
    <>
      <div className="mt-4 w-full rounded border border-gray-700 bg-white/10">
        <FootballResultsHeader results={results} />
        <Standings standings={standings} />
      </div>

      <LastUpdated date={lastUpdatedDate} />
    </>
  );
};

export default FootballResults;
