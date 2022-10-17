import RecentForm from "../RecentForm/RecentForm";
import {
  MatchInfo,
  Standing as StandingType,
} from "../../../../services/football/types";
import { useAppSelector } from "../../../../reduxHooks";

type Props = {
  matchInfo: MatchInfo;
  points: number;
  rank: number;
  standing: StandingType;
};

const Standing = ({ matchInfo, points, rank, standing }: Props) => {
  const standingsFilter = useAppSelector(
    ({ standingsFilter }) => standingsFilter
  );

  return (
    <tr key={standing.team.id} className="standing-row">
      <td>{rank}.</td>
      <td className="flex items-center align-center min-w-[8rem]">
        <img className="hidden h-8 sm:flex" src={standing.team.logo} />
        <p className="ml-2 mt-0.5 sm:mt-0 whitespace-nowrap">
          {standing.team.name}
        </p>
      </td>

      <td>{matchInfo.played}</td>
      <td>{matchInfo.win}</td>
      <td>{matchInfo.draw}</td>
      <td>{matchInfo.lose}</td>
      <td>
        {matchInfo.goals.for}:{matchInfo.goals.against}
      </td>

      <td>{points}</td>

      {standingsFilter === "all" && (
        <td>
          <RecentForm form={standing.form} />
        </td>
      )}
    </tr>
  );
};

export default Standing;
