/** @jsxImportSource theme-ui */

import { Interpolation } from "@emotion/react";
import { FC, ReactNode } from "react";
import { Box, ThemeUIStyleObject } from "theme-ui";

type Props = {
  children: ReactNode;
  css?: Interpolation<any>;
  sx?: ThemeUIStyleObject;
  className?: string;
};

const ContentBox: FC<Props> = ({ children, ...rest }) => {
  return (
    <Box mx={[3, 3]} {...rest}>
      {children}
    </Box>
  );
};

export default ContentBox;
