import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: 0,
  emptyCells: "show",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: vars.color.light,
  borderRadius: vars.radius[1]
});

globalStyle(`${table} th`, {
  verticalAlign: "top",
  width: "8em"
});

globalStyle(`${table} th, ${table} td`, {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: vars.color.light,
  borderLeftStyle: "solid",
  borderLeftWidth: "1px",
  borderLeftColor: vars.color.light,
  fontSize: "inherit",
  margin: 0,
  overflow: "visible",
  padding: vars.space[1]
});

globalStyle(`${table} th ul, ${table} th ol, ${table} td ul, ${table} td ol`, {
  listStylePosition: "outside",
  margin: 0,
  paddingLeft: "1.5em"
});
