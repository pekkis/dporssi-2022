import { FC } from "react";
import { formatDate } from "../../services/date";
import { DateRange } from "../../types";

type Props = {
  reign: DateRange;
};

const Reign: FC<Props> = ({ reign }) => {
  const { start, end } = reign;
  if (start && !end) {
    return <span>{`${formatDate(start)} -`}</span>;
  }

  if (start && end) {
    return <span>{`${formatDate(start)} - ${formatDate(end)}`}</span>;
  }
  return <span>ei tiedossa</span>;
};

export default Reign;
