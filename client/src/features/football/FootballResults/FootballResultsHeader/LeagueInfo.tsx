type Props = {
  logoUrl: string;
  name: string;
};

const LeagueInfo = ({ logoUrl, name }: Props) => (
  <div className="flex justify-center items-center p-4 border-r border-current grow">
    <img className="h-8" src={logoUrl} />
    <p className="ml-4 text-2xl">{name}</p>
  </div>
);

export default LeagueInfo;
