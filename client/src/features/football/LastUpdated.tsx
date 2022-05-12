import { Dayjs } from "dayjs";

type Props = {
  date: Dayjs;
};

const LastUpdated = ({ date }: Props) => (
  <div className="my-4 font-thin">
    <p>Last Updated: {date.toString()}</p>
  </div>
);

export default LastUpdated;
