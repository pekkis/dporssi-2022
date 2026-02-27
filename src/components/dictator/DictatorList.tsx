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
    <div>
      {dictators.map((dictator) => {
        return (
          <div
            className="grid gap-2 my-8"
            style={{ gridTemplateColumns: "100px auto" }}
            key={dictator.sys.id}
          >
            <div style={{ gridRowStart: 1, gridColumnStart: 1, gridRowEnd: 2 }}>
              <ContentfulImage
                data={dictator.primaryImage}
                config={{
                  width: 150,
                  aspectRatio: 0.75,
                  fit: "fill",
                  focus: "face"
                }}
                className="border border-link rounded block"
                alt={dictator.name}
              />
            </div>
            <div
              style={{
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

              <table className="[&_th]:text-left [&_th]:align-top">
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
              <div
                style={{
                  gridRowStart: 2,
                  gridColumnStart: 1,
                  gridColumnEnd: 3
                }}
              >
                <Markdown>{dictator.synopsis}</Markdown>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DictatorList;
