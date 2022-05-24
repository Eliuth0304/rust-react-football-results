import { useAppSelector } from "../../../../reduxHooks";

type Props = {
  onClick: () => void;
  text: string;
};

const MatchFilterTab = ({ onClick, text }: Props) => {
  const standingsFilter = useAppSelector((state) => state.standingsFilter);

  const isSelected =
    text.toLowerCase() === standingsFilter ||
    (text.toLowerCase() === "overall" && standingsFilter === "all");

  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 mx-1 my-2 text-xs font-bold uppercase rounded hover:bg-gray-100 ${
        isSelected ? "bg-gray-100" : ""}`}
    >
      {text}
    </button>
  );
};

export default MatchFilterTab;
