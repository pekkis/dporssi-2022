import { FC } from "react";
import { Heading } from "theme-ui";
import { Dictator } from "@/types";

type Props = {
  dictator: Dictator;
};

const NameHeading: FC<Props> = ({ dictator }) => {
  if (!dictator.aka) {
    return <Heading as="h2">{dictator.name}</Heading>;
  }

  return (
    <Heading
      as="h2"
      sx={{
        lineHeight: "1"
      }}
    >
      {dictator.name} <small>(aka {dictator.aka.join(", ")}</small>)
    </Heading>
  );
};

export default NameHeading;
