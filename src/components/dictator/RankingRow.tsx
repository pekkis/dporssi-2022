/** @jsxImportSource theme-ui */

import { FC } from "react";
import { Dictator } from "@/types";
import { sortByCanonicalRanking } from "@/services/dictator";
import { filter, head } from "ramda";
import { Locale, url } from "@/services/url";
import InternalLink from "@/components/InternalLink";

type Props = {
  me: Dictator;
  neighbours: Dictator[];
};

const RankingRow: FC<Props> = ({ me, neighbours }) => {
  if (!me.canonicalRanking) {
    return null;
  }

  if (neighbours.length === 0) {
    return null;
  }

  const sorted = filter(
    (d) => !!d.canonicalRanking,
    sortByCanonicalRanking(neighbours)
  );
  const first = head(sorted);

  if (!first?.canonicalRanking) {
    return null;
  }

  return (
    <tr>
      <th>Pörssi</th>
      <td>
        <ol start={first.canonicalRanking}>
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
        </ol>
      </td>
    </tr>
  );
};

export default RankingRow;
