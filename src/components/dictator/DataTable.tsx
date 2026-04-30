import { dataTable } from "./DataTable.css";

const DataTable = ({ children }) => {
  return <table className={dataTable}>{children}</table>;
};

export default DataTable;
