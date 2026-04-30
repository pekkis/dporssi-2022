import { Box } from "@/components/styled/Box";
import { Heading } from "@/components/styled/Heading";
import { CSSProperties, FC } from "react";
import InternalLink from "@/components/InternalLink";
import Markdown from "@/components/Markdown";
import SubHeading from "@/components/SubHeading";
import { TaxonomyTerm } from "@/types";
import ExternalLink from "@/components/ExternalLink";
import { tagPillInline } from "./taxonomy.css";

type Props = {
  name: string;
  taxonomy: TaxonomyTerm[];
};

const grids: Record<string, CSSProperties> = {
  "Luonne ja persoona": {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 10
  }
};

const Category: FC<Props> = ({ name, taxonomy }) => {
  return (
    <Box mb="4" style={grids[name]}>
      <SubHeading>{name}</SubHeading>
      {taxonomy.map((tag) => {
        return (
          <Box key={tag.slug} mb="3">
            <Heading as="h4" mb="2">
              <InternalLink to={`/luokittelu/${tag.slug}`}>
                <span className={tagPillInline}>{tag.name}</span>
              </InternalLink>
            </Heading>

            <Markdown>{tag.description}</Markdown>

            {tag.wikipedia && (
              <p>
                <ExternalLink to={tag.wikipedia}>
                  {tag.name} wikipediassa
                </ExternalLink>
              </p>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Category;
