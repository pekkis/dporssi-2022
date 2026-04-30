import { style, globalStyle } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const dataTable = style({
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: 0,
  emptyCells: "show",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: themeContract.colors.light,
  borderRadius: themeContract.radii["1"]
});

globalStyle(`${dataTable} th`, {
  verticalAlign: "top",
  width: "8em"
});

globalStyle(`${dataTable} th, ${dataTable} td`, {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: themeContract.colors.light,
  borderLeftStyle: "solid",
  borderLeftWidth: "1px",
  borderLeftColor: themeContract.colors.light,
  fontSize: "inherit",
  margin: 0,
  overflow: "visible",
  padding: themeContract.space["1"]
});

globalStyle(
  `${dataTable} th ul, ${dataTable} th ol, ${dataTable} td ul, ${dataTable} td ol`,
  {
    listStylePosition: "outside",
    margin: 0,
    paddingLeft: "1.5em"
  }
);
