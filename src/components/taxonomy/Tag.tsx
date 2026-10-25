import { FC } from "react";
import { Box } from "@/components/ui";
import * as styles from "./Tag.css";
import InternalLink from "@/components/InternalLink";

export interface TagInterface {
  name: string;
  slug: string;
}

type Props = {
  tag: TagInterface;
  as?: React.ElementType;
};

const Tag: FC<Props> = ({ as = "li", tag }) => {
  return (
    <Box as={as} className={styles.tag}>
      <InternalLink variant="tag" to={`/luokittelu/${tag.slug}`}>
        {tag.name}
      </InternalLink>
    </Box>
  );
};

export default Tag;
