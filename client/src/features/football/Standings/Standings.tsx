import { Fragment } from "react";
import { Standing } from "../../../services/football/types/raw";
import StandingsHeader from "./StandingsHeader";

type Props = {
  standings: Array<Standing>;
};

const Standings = ({ standings }: Props) => (
  <>
    <StandingsHeader />
    <table className="w-full">
      <thead className="text-left uppercase">
        <tr></tr>
        <th>#</th>
        <th>Team</th>
        <th>MP</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>G</th>
        <th>Pts</th>
        <th>Form</th>
      </thead>
      <tbody>
        {standings.map((standing) => (
          <tr key={standing.team.id}>
            <td>{standing.rank}.</td>
            <td className="flex">
              <img className="h-8" src={standing.team.logo} />
              <p className="ml-2">{standing.team.name}</p>
            </td>

            <td>{standing.all.played}</td>
            <td>{standing.all.win}</td>
            <td>{standing.all.draw}</td>
            <td>{standing.all.lose}</td>
            <td>
              {standing.all.goals.for}:{standing.all.goals.against}
            </td>

            <td>{standing.points}</td>

            <td>{standing.form}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default Standings;
