import { globalStyle, style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const list = style({
  display: "block",
  width: "100%",
  margin: 0,
  padding: 0,
  listStyleType: "none",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "flex-end",
  "@media": { [media.tablet]: { display: "flex" } }
});

// Also reaches UserMenu's own <li>.
globalStyle(`${list} li`, { marginRight: vars.space[1] });
