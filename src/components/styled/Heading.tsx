import { Box, BoxProps } from "./Box";
import { cx } from "@/styles/cx";
import { headingBase, headingSize } from "./Heading.css";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props = Omit<BoxProps<HeadingTag>, "as"> & {
  as?: HeadingTag;
};

export const Heading = ({ as = "h2", className, ...rest }: Props) => {
  const tag: HeadingTag = as;
  return (
    <Box
      as={tag}
      className={cx(headingBase, headingSize[tag], className)}
      {...(rest as BoxProps<HeadingTag>)}
    />
  );
};
