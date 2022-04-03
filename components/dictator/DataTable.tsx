/** @jsx jsx */
import { jsx } from "theme-ui";

const DataTable = ({ children }) => {
  return (
    <table
      sx={{
        width: "100%",
        borderCollapse: "collapse",
        borderSpacing: 0,
        emptyCells: "show",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "light",
        borderRadius: 1,

        th: {
          verticalAlign: "top",
          width: "8em"
        },

        "th, td": {
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "light",

          borderLeftStyle: "solid",
          borderLeftWidth: 1,
          borderLeftColor: "light",

          fontSize: "inherit",
          margin: 0,
          overflow: "visible",
          padding: 1,

          "ul, ol": {
            listStylePosition: "outside",
            m: 0,
            pl: "1.5em"
          }
        }
      }}
    >
      {children}
    </table>
  );
};

export default DataTable;
