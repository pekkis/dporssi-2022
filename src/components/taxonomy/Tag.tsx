import { FC } from "react";
import InternalLink from "@/components/InternalLink";

export interface TagInterface {
  name: string;
  slug: string;
}

type Props = {
  tag: TagInterface;
  as?: React.ElementType;
};

const Tag: FC<Props> = ({ as: As = "li", tag }) => {
  return (
    <As className="inline-block mr-1 mb-1 p-1 bg-primary text-white rounded-[5px] font-light">
      <InternalLink variant="links.tag" to={`/luokittelu/${tag.slug}`}>
        {tag.name}
      </InternalLink>
    </As>
  );
};

export default Tag;
