import StandingsTableBody from "./StandingsTableBody";
import StandingsTableHeader from "./StandingsTableHeader";

const StandingsTable = () => {
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-full text-xs text-center table-fixed sm:text-sm">
        <StandingsTableHeader />
        <StandingsTableBody />
      </table>
    </div>
  );
};

export default StandingsTable;
