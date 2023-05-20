/** @jsxImportSource theme-ui */
import { Box, Heading, jsx, Paragraph } from "theme-ui";
import { FC } from "react";
import InternalLink from "@/components/InternalLink";
import Markdown from "@/components/Markdown";
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
    <Box
      mb={4}
      sx={{
        ...grids[name]
      }}
    >
      <SubHeading>{name}</SubHeading>
      {taxonomy.map((tag) => {
        return (
          <Box key={tag.slug} mb={3}>
            <Heading as="h4" mb={2}>
              <InternalLink to={`/luokittelu/${tag.slug}`}>
                <span
                  sx={{
                    display: "inline-block",
                    backgroundColor: "primary",
                    color: "white",
                    width: "auto",
                    margin: "0 0 auto 0",
                    p: 1,
                    borderRadius: 1,
                    fontWeight: "light"
                  }}
                >
                  {tag.name}
                </span>
              </InternalLink>
            </Heading>

            <Markdown>{tag.description}</Markdown>

            {tag.wikipedia && (
              <Paragraph>
                <ExternalLink to={tag.wikipedia}>
                  {tag.name} wikipediassa
                </ExternalLink>
              </Paragraph>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Category;
