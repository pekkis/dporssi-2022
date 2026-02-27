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
    <ul className="list-none my-1 p-0">
      {sortedTaxonomies.map((tag) => (
        <Tag key={tag.slug} tag={tag} />
      ))}
    </ul>
  );
};

export default memo(Taxonomies);
