import FormIndicator from "./FormIndicator";

type Props = {
  form: string;
};

const Form = ({ form }: Props) => (
  <div className="flex justify-center font-mono">
    {form.split("").map((result, index) => (
      <FormIndicator key={index} result={result} />
    ))}
  </div>
);

export default Form;
