import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const anchor = style({
  color: "inherit",
  whiteSpace: "nowrap",
  selectors: {
    "&.active": { fontWeight: vars.fontWeight.bold }
  }
});

export const icon = style({
  verticalAlign: "middle",
  marginLeft: vars.space[1]
});
