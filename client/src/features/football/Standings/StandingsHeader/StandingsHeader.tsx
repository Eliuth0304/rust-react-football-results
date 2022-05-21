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
      <MatchFilterTab
        onClick={() => changeTab(StandingsFilter.Overall)}
        text="Overall"
      />
      <MatchFilterTab
        onClick={() => changeTab(StandingsFilter.Home)}
        text="Home"
      />
      <MatchFilterTab
        onClick={() => changeTab(StandingsFilter.Away)}
        text="Away"
      />
    </div>
  );
};

export default StandingsHeader;
