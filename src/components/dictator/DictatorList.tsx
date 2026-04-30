import { FC } from "react";

import { Box } from "@/components/styled/Box";
import InternalLink from "@/components/InternalLink";
import Markdown from "@/components/Markdown";
import CountryLink from "./CountryLink";
import Reign from "./Reign";
import { Dictator } from "@/types";
import SubHeading from "@/components/SubHeading";
import ContentfulImage from "@/components/contentful/ContentfulImage";
import {
  dataTable,
  dictatorCard,
  dictatorImage,
  imageSlot,
  infoSlot,
  synopsisSlot
} from "./DictatorList.css";

type Props = {
  showRanking?: boolean;
  dictators: Dictator[];
};

const DictatorList: FC<Props> = ({ showRanking = false, dictators }) => {
  if (dictators.length === 0) {
    return null;
  }

  return (
    <div>
      {dictators.map((dictator) => {
        return (
          <Box className={dictatorCard} my="4" key={dictator.sys.id}>
            <div className={imageSlot}>
              <ContentfulImage
                data={dictator.primaryImage}
                config={{
                  width: 150,
                  aspectRatio: 0.75,
                  fit: "fill",
                  focus: "face"
                }}
                className={dictatorImage}
                alt={dictator.name}
              />
            </div>
            <div className={infoSlot}>
              <SubHeading>
                <InternalLink to={`/diktaattori/${dictator.slug}`}>
                  {showRanking && (
                    <strong>{dictator.canonicalRanking}. </strong>
                  )}
                  {dictator.name}
                </InternalLink>
              </SubHeading>

              <table className={dataTable}>
                <tbody>
                  <tr>
                    <th>Vallassa</th>
                    <td>
                      {dictator.reignsCollection.items.map((reign, i) => {
                        return (
                          <div key={i}>
                            <Reign reign={reign} />
                          </div>
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
            </div>

            {dictator.synopsis && (
              <div className={synopsisSlot}>
                <Markdown>{dictator.synopsis}</Markdown>
              </div>
            )}
          </Box>
        );
      })}
    </div>
  );
};

export default DictatorList;
