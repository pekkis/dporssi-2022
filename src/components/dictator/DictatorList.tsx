/** @jsxImportSource theme-ui */
import { Box, jsx } from "theme-ui";
import { FC } from "react";

import InternalLink from "../InternalLink";
import Markdown from "../Markdown";
import CountryLink from "./CountryLink";
import Reign from "./Reign";
import { Dictator } from "../../types";
import SubHeading from "../SubHeading";
import ContentfulImage from "../contentful/ContentfulImage";

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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100px auto",
              gap: 2
            }}
            my={4}
            key={dictator.sys.id}
          >
            <Box
              sx={{
                gridRowStart: 1,
                gridColumnStart: 1,
                gridRowEnd: 2
              }}
            >
              <ContentfulImage
                data={dictator.primaryImage}
                config={{
                  width: 150,
                  aspectRatio: 0.75,
                  fit: "fill",
                  focus: "face"
                }}
                styles={{
                  borderStyle: "solid",
                  borderColor: "link",
                  borderWidth: "1px",
                  borderRadius: 1,
                  display: "block"
                }}
                alt={dictator.name}
              />
            </Box>
            <Box
              sx={{
                gridRowStart: 1,
                gridRowEnd: 2,
                gridColumnStart: 2
              }}
            >
              <SubHeading>
                <InternalLink to={`/diktaattori/${dictator.slug}`}>
                  {showRanking && (
                    <strong>{dictator.canonicalRanking}. </strong>
                  )}
                  {dictator.name}
                </InternalLink>
              </SubHeading>

              <table
                sx={{
                  th: {
                    textAlign: "left",
                    verticalAlign: "top"
                  }
                }}
              >
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
              <Box
                sx={{
                  gridRowStart: 2,
                  gridColumnStart: 1,
                  gridColumnEnd: 3
                }}
              >
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
