import { FC, ReactNode } from "react";
import { Box } from "@/components/styled/Box";

type Props = {
  children: ReactNode;
  className?: string;
};

const ContentBox: FC<Props> = ({ children, ...rest }) => {
  return (
    <Box mx="3" {...rest}>
      {children}
    </Box>
  );
};

export default ContentBox;
