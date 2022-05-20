import MatchFilterTab from "./MatchFilterTab";

const StandingsHeader = () => (
  <div className="flex bg-gray-200">
    <MatchFilterTab selected text="Overall" />
    <MatchFilterTab text="Home" />
    <MatchFilterTab text="Away" />
  </div>
);

export default StandingsHeader;
