/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { FC, memo } from "react";
import Tag, { TagInterface } from "./Tag";

import { sortBy, prop, uniqBy } from "ramda";

const sortByName = sortBy(prop("name"));

type Props = {
  taxonomy?: TagInterface[];
};

const Taxonomies: FC<Props> = ({ taxonomy }) => {
  if (!taxonomy) {
    return null;
  }

  const uniqueTaxonomies = uniqBy((tag: TagInterface) => tag.name, taxonomy);
  const sortedTaxonomies = sortByName(uniqueTaxonomies);

  return (
    <ul
      sx={{
        listStyleType: "none",
        listStylePosition: "outside",
        my: 1,
        padding: 0,
      }}
    >
      {sortedTaxonomies.map((tag) => (
        <Tag key={tag.slug} tag={tag} />
      ))}
    </ul>
  );
};

export default memo(Taxonomies);
