import { Standing } from "../../services/football/types/raw";

type Props = {
  standings: Array<Standing>;
};

const Standings = ({ standings }: Props) => (
  <>
    {standings.map((standing) => (
      <div key={standing.team.id} className="flex px-4 py-2 items-center">
        <img className="h-8" src={standing.team.logo} />
        <p className="ml-2">{standing.team.name}</p>
      </div>
    ))}
  </>
);

export default Standings;
