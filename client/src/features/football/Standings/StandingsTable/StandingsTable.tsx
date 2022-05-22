import StandingsTableBody from "./StandingsTableBody";
import StandingsTableHeader from "./StandingsTableHeader";

const StandingsTable = () => {
  return (
    <table className="min-w-full text-xs text-center table-fixed sm:text-sm">
      <StandingsTableHeader />
      <StandingsTableBody />
    </table>
  );
};

export default StandingsTable;
