type Props = {
  year: number;
};

const Season = ({ year }: Props) => (
  <div className="flex col-span-2 items-center px-4">
    <p className="text-xl">
      Season: {year}-{year + 1}
    </p>
  </div>
);

export default Season;
