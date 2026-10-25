import type { ReactNode } from "react";
import * as styles from "./BlockQuote.css";

const BlockQuote = ({ children }: { children: ReactNode }) => {
  return <blockquote className={styles.blockQuote}>{children}</blockquote>;
};

export default BlockQuote;
