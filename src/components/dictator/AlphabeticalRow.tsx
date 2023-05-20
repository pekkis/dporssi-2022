/** @jsxImportSource theme-ui */

import { FC } from "react";
import { Dictator } from "@/types";
import { sortBySortName } from "@/services/dictator";
import { Locale, url } from "@/services/url";
import InternalLink from "@/components/InternalLink";

type Props = {
  me: Dictator;
  neighbours: Dictator[];
};

const AlphabeticalRow: FC<Props> = ({ me, neighbours }) => {
  if (neighbours.length === 0) {
    return null;
  }

  const sorted = sortBySortName(neighbours);

  return (
    <tr>
      <th>Diktatuurin aakkoset</th>
      <td>
        <ul>
          {sorted.map((d) => {
            if (d.sys.id === me.sys.id) {
              return (
                <li key={d.sys.id}>
                  <strong>{d.name}</strong>
                </li>
              );
            }

            return (
              <li key={d.sys.id}>
                <InternalLink
                  to={url(
                    "dictatorItem",
                    process.env.NEXT_PUBLIC_LOCALE as Locale
                  )(d)}
                >
                  {d.name}
                </InternalLink>
              </li>
            );
          })}
        </ul>
      </td>
    </tr>
  );
};

export default AlphabeticalRow;
