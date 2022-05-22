type Props = {
  result: String;
};

const FormIndicator = ({ result }: Props) => {
  let backgroundColorClass = "bg-black";

  if (result === "W") {
    backgroundColorClass = "bg-green-500";
  } else if (result === "D") {
    backgroundColorClass = "bg-yellow-500";
  } else if (result === "L") {
    backgroundColorClass = "bg-red-500";
  }

  return (
    <div
      className={`px-2 mx-px text-white rounded shrink ${backgroundColorClass}`}
    >
      {result}
    </div>
  );
};

export default FormIndicator;
