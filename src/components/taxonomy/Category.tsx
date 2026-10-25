import { Box, cx, Heading, Paragraph } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "./Category.css";
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

const Category: FC<Props> = ({ name, taxonomy }) => {
  return (
    <Box
      className={cx(
        styles.category,
        styles.placement[name as keyof typeof styles.placement]
      )}
    >
      <SubHeading>{name}</SubHeading>
      {taxonomy.map((tag) => {
        return (
          <Box key={tag.slug} className={sprinkles({ mb: 3 })}>
            <Heading as="h4" className={sprinkles({ mb: 2 })}>
              <InternalLink to={`/luokittelu/${tag.slug}`}>
                <span className={styles.tagName}>{tag.name}</span>
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
