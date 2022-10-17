import { useAppSelector } from "../../../../reduxHooks";

const StandingsTableHeader = () => {
  const standingsFilter = useAppSelector(
    ({ standingsFilter }) => standingsFilter
  );
  return (
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
        {standingsFilter === "all" && <th className="w-0">Form</th>}
      </tr>
    </thead>
  );
};

export default StandingsTableHeader;
