import { FootballResults } from "../../../../services/football/types";
import LeagueInfo from "./LeagueInfo";
import Season from "./Season";

type Props = {
  results: FootballResults;
};

const FootballResultsHeader = ({ results }: Props) => (
  <div className="flex bg-gray-200 rounded border-b border-white">
    <LeagueInfo logoUrl={results.logo} name={results.name} />
    <Season year={results.season} />
  </div>
);

export default FootballResultsHeader;
