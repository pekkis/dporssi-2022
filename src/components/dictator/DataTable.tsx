type Props = { children: React.ReactNode };

const DataTable = ({ children }: Props) => {
  return (
    <table className="data-table">
      {children}
    </table>
  );
};

export default DataTable;
