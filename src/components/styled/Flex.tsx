import { ElementType } from "react";
import { Box, BoxProps } from "./Box";

/**
 * `Flex` is just `Box` with display: flex preset. Same shorthand
 * theme-ui used.
 */
export const Flex = <T extends ElementType = "div">(props: BoxProps<T>) => {
  return <Box display="flex" {...(props as BoxProps)} />;
};
