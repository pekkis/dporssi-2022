import type { ReactNode } from "react";
import * as styles from "./DataTable.css";

const DataTable = ({ children }: { children: ReactNode }) => {
  return <table className={styles.table}>{children}</table>;
};

export default DataTable;
