import type { ReactNode } from "react";
import { Box } from "@/components/ui";
import * as styles from "./ExtraInfoBox.css";

const ExtraInfoBox = ({ children }: { children: ReactNode }) => {
  return <Box className={styles.extraInfo}>{children}</Box>;
};

export default ExtraInfoBox;
