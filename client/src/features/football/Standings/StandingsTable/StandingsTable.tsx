import { useGetFootballResultsQuery } from "../../../../services/football";
import RecentForm from "../RecentForm/RecentForm";

const StandingsTable = () => {
  const { data: { standings = [] } = {} } = useGetFootballResultsQuery();

  return (
    <table className="min-w-full text-xs text-center table-fixed sm:text-sm">
      <thead className="uppercase bg-gray-200">
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>MP</th>
          <th className="w-8">W</th>
          <th className="w-8">D</th>
          <th className="w-8">L</th>
          <th className="w-16">G</th>
          <th className="w-16">Pts</th>
          <th className="w-0">Form</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {standings.map((standing) => (
          <tr key={standing.team.id} className="standing-row">
            <td>{standing.rank}.</td>
            <td className="flex items-center align-center min-w-[8rem]">
              <img className="hidden h-8 sm:flex" src={standing.team.logo} />
              <p className="ml-2 mt-0.5 sm:mt-0 whitespace-nowrap">
                {standing.team.name}
              </p>
            </td>

            <td>{standing.all.played}</td>
            <td>{standing.all.win}</td>
            <td>{standing.all.draw}</td>
            <td>{standing.all.lose}</td>
            <td>
              {standing.all.goals.for}:{standing.all.goals.against}
            </td>

            <td>{standing.points}</td>

            <td>
              <RecentForm form={standing.form} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StandingsTable;
