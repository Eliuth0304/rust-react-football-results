import { useGetFootballResultsQuery } from "../../../../services/football";
import Standing from "./Standing";
import { useAppSelector } from "../../../../reduxHooks";

const calculatePoints = (wins: number, draws: number) => wins * 3 + draws;

const StandingsTableBody = () => {
  const { data: { standings = [] } = {} } = useGetFootballResultsQuery();

  const standingsWithMetadata = standings.map((standing) => {
    const standingsFilter = useAppSelector(
      ({ standingsFilter }) => standingsFilter
    );

    const matchInfo = standing[standingsFilter];

    const points = calculatePoints(matchInfo.win, matchInfo.draw);

    return { matchInfo, points, standing };
  });

  standingsWithMetadata.sort(
    (standingA, standingB) => standingB.points - standingA.points
  );

  return (
    <tbody className="divide-y">
      {standingsWithMetadata.map(({ matchInfo, points, standing }, index) => (
        <Standing
          key={standing.team.id}
          {...{ matchInfo, points, rank: index + 1, standing }}
        />
      ))}
    </tbody>
  );
};

export default StandingsTableBody;
