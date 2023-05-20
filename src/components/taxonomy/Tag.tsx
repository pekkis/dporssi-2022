/** @jsxImportSource theme-ui */
import { FC } from "react";
import { Box, jsx } from "theme-ui";
import InternalLink from "../InternalLink";

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
    <Box
      as={as}
      sx={{
        display: "inline-block",
        marginRight: 1,
        marginBottom: 1,
        padding: 1,
        backgroundColor: "primary",
        color: "white",
        borderRadius: "5px",
        fontWeight: "light",
      }}
    >
      <InternalLink variant="links.tag" to={`/luokittelu/${tag.slug}`}>
        {tag.name}
      </InternalLink>
    </Box>
  );
};

export default Tag;
