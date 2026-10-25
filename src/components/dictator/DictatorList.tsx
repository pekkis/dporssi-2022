import { Box } from "@/components/ui";
import * as styles from "./DictatorList.css";
import { FC } from "react";

import InternalLink from "@/components/InternalLink";
import Markdown from "@/components/Markdown";
import CountryLink from "./CountryLink";
import Reign from "./Reign";
import { Dictator } from "@/types";
import SubHeading from "@/components/SubHeading";
import ContentfulImage from "@/components/contentful/ContentfulImage";

type Props = {
  showRanking?: boolean;
  dictators: Dictator[];
};

const DictatorList: FC<Props> = ({ showRanking = false, dictators }) => {
  if (dictators.length === 0) {
    return null;
  }

  return (
    <Box>
      {dictators.map((dictator) => {
        return (
          <Box className={styles.item} key={dictator.sys.id}>
            <Box className={styles.image}>
              <ContentfulImage
                data={dictator.primaryImage}
                config={{
                  width: 150,
                  aspectRatio: 0.75,
                  fit: "fill",
                  focus: "face"
                }}
                className={styles.portrait}
                alt={dictator.name}
              />
            </Box>
            <Box className={styles.details}>
              <SubHeading>
                <InternalLink to={`/diktaattori/${dictator.slug}`}>
                  {showRanking && (
                    <strong>{dictator.canonicalRanking}. </strong>
                  )}
                  {dictator.name}
                </InternalLink>
              </SubHeading>

              <table className={styles.facts}>
                <tbody>
                  <tr>
                    <th>Vallassa</th>
                    <td>
                      {dictator.reignsCollection.items.map((reign, i) => {
                        return (
                          <Box key={i}>
                            <Reign reign={reign} />
                          </Box>
                        );
                      })}
                    </td>
                  </tr>

                  <tr>
                    <th>Maa</th>
                    <td>
                      <CountryLink country={dictator.country} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>

            {dictator.synopsis && (
              <Box className={styles.synopsis}>
                <Markdown>{dictator.synopsis}</Markdown>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default DictatorList;
