/** @jsxImportSource theme-ui */
import { Box, jsx } from "theme-ui";
import { FC } from "react";
import { DateRange } from "@/types";
import { formatDate } from "@/services/date";
import { DateTime } from "luxon";

type Props = {
  lifespan: DateRange;
};

const LifespanRow: FC<Props> = ({ lifespan }) => {
  if (!lifespan) {
    return null;
  }

  const start = DateTime.fromISO(lifespan.start);
  const end = lifespan.end ? DateTime.fromISO(lifespan.end) : DateTime.utc();

  const diff = end.diff(start, ["years"]);

  return (
    <>
      <tr>
        <th>Syntyi</th>
        <td>
          {formatDate(start)}{" "}
          {!lifespan.end && <> ({Math.floor(diff.years)} vuotta)</>}
        </td>
      </tr>
      {lifespan.end && (
        <tr>
          <th>Kuoli</th>
          <td>
            <Box>
              {formatDate(lifespan.end)}
              {lifespan.end && <> ({Math.floor(diff.years)} vuotta)</>}
            </Box>
            <Box></Box>
          </td>
        </tr>
      )}
    </>
  );
};

export default LifespanRow;
