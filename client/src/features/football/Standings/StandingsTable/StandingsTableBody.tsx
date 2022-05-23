import { useAppSelector } from "../../../../reduxHooks";
import { useGetFootballResultsQuery } from "../../../../services/football";
import { StandingsFilter } from "../../standingsFilterSlice";
import RecentForm from "../RecentForm/RecentForm";

const calculatePoints = (wins: number, draws: number) => wins * 3 + draws;

const StandingsTableBody = () => {
  const { data: { standings = [] } = {} } = useGetFootballResultsQuery();

  const standingsFilter = useAppSelector(
    ({ standingsFilter }) => standingsFilter
  );

  return (
    <tbody className="divide-y">
      {standings.map((standing) => {
        let matchInfo = standing.all;

        if (standingsFilter === StandingsFilter.Away) {
          matchInfo = standing.away;
        } else if (standingsFilter === StandingsFilter.Home) {
          matchInfo = standing.home;
        }

        const points = calculatePoints(matchInfo.win, matchInfo.draw);

        return (
          <tr key={standing.team.id} className="standing-row">
            <td>{standing.rank}.</td>
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

            <td>
              <RecentForm form={standing.form} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default StandingsTableBody;
