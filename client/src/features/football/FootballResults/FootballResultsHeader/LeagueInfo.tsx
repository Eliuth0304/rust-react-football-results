type Props = {
  logoUrl: string;
  name: string;
};

const LeagueInfo = ({ logoUrl, name }: Props) => (
  <div className="flex justify-center items-center px-4 py-2 border-r border-white md:p-4 grow">
    <img className="h-4 md:h-8" src={logoUrl} />
    <p className="ml-1 text-lg sm:ml-4 sm:text-2xl">{name}</p>
  </div>
);

export default LeagueInfo;
