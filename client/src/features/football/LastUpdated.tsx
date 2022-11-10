import { Dayjs } from "dayjs";

type Props = {
  date: Dayjs;
};

const LastUpdated = ({ date }: Props) => (
  <div className="mt-4 font-thin text-center">
    <p>Last Updated: {date.format("DD MMM YYYY")}</p>
  </div>
);

export default LastUpdated;
