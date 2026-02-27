import { FC } from "react";
import InternalLink from "@/components/InternalLink";
import Markdown from "@/components/Markdown";
import Paragraph from "@/components/Paragraph";
import SubHeading from "@/components/SubHeading";
import { TaxonomyTerm } from "@/types";
import ExternalLink from "@/components/ExternalLink";

type Props = {
  name: string;
  taxonomy: TaxonomyTerm[];
};

const grids = {
  "Luonne ja persoona": {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 10
  }
};

const Category: FC<Props> = ({ name, taxonomy }) => {
  return (
    <div className="mb-8" style={grids[name] || {}}>
      <SubHeading>{name}</SubHeading>
      {taxonomy.map((tag) => {
        return (
          <div key={tag.slug} className="mb-4">
            <h4 className="text-xl font-bold mb-2">
              <InternalLink to={`/luokittelu/${tag.slug}`}>
                <span className="inline-block bg-primary text-white w-auto m-0 p-1 rounded font-light">
                  {tag.name}
                </span>
              </InternalLink>
            </h4>

            <Markdown>{tag.description}</Markdown>

            {tag.wikipedia && (
              <Paragraph>
                <ExternalLink to={tag.wikipedia}>
                  {tag.name} wikipediassa
                </ExternalLink>
              </Paragraph>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Category;
