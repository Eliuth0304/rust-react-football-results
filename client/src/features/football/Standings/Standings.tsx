import StandingsHeader from "./StandingsHeader/StandingsHeader";
import "./Standings.css";
import StandingsTable from "./StandingsTable/StandingsTable";

const Standings = () => (
  <div className="overflow-x-scroll">
    <StandingsHeader />
    <StandingsTable />
  </div>
);

export default Standings;
