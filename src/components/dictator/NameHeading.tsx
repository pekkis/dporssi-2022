import { FC } from "react";
import { Dictator } from "@/types";

type Props = {
  dictator: Dictator;
};

const NameHeading: FC<Props> = ({ dictator }) => {
  if (!dictator.aka) {
    return <h2 className="text-2xl font-bold">{dictator.name}</h2>;
  }

  return (
    <h2 className="text-2xl font-bold leading-none">
      {dictator.name} <small>(aka {dictator.aka.join(", ")}</small>)
    </h2>
  );
};

export default NameHeading;
