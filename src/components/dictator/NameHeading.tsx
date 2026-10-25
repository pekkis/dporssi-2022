import { FC } from "react";
import { Heading } from "@/components/ui";
import { Dictator } from "@/types";
import * as styles from "./NameHeading.css";

type Props = {
  dictator: Dictator;
};

const NameHeading: FC<Props> = ({ dictator }) => {
  if (!dictator.aka) {
    return <Heading as="h2">{dictator.name}</Heading>;
  }

  return (
    <Heading as="h2" className={styles.withAka}>
      {dictator.name} <small>(aka {dictator.aka.join(", ")}</small>)
    </Heading>
  );
};

export default NameHeading;
