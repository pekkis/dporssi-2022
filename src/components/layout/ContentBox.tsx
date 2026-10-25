import { FC, ReactNode } from "react";
import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";

type Props = {
  children: ReactNode;
};

const ContentBox: FC<Props> = ({ children }) => {
  return <Box className={sprinkles({ mx: 3 })}>{children}</Box>;
};

export default ContentBox;
