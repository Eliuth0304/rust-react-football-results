import { Standing } from "../../services/football/types/raw";

type Props = {
  standings: Array<Standing>;
};

const Standings = ({ standings }: Props) => (
  <>
    {standings.map((standing) => (
      <div key={standing.team.id} className="flex px-4 py-2">
        {standing.team.name}
      </div>
    ))}
  </>
);

export default Standings;
