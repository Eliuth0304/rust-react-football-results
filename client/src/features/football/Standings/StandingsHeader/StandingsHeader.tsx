import MatchFilterTab from "./MatchFilterTab";
import { useAppDispatch } from "../../../../reduxHooks";
import {
  setStandingsFilter,
  StandingsFilter,
} from "../../standingsFilterSlice";

const StandingsHeader = () => {
  const dispatch = useAppDispatch();

  const changeTab = (standingsFilter: StandingsFilter) => {
    dispatch(setStandingsFilter(standingsFilter));
  };

  return (
    <div className="flex bg-gray-200 border-b border-white">
      <MatchFilterTab onClick={() => changeTab("all")} text="Overall" />
      <MatchFilterTab onClick={() => changeTab("home")} text="Home" />
      <MatchFilterTab onClick={() => changeTab("away")} text="Away" />
    </div>
  );
};

export default StandingsHeader;
