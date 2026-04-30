import { FC, ElementType, createElement } from "react";
import InternalLink from "@/components/InternalLink";
import { tagPill } from "./taxonomy.css";

export interface TagInterface {
  name: string;
  slug: string;
}

type Props = {
  tag: TagInterface;
  as?: ElementType;
};

const Tag: FC<Props> = ({ as = "li", tag }) => {
  return createElement(
    as,
    { className: tagPill },
    <InternalLink variant="tag" to={`/luokittelu/${tag.slug}`}>
      {tag.name}
    </InternalLink>
  );
};

export default Tag;
