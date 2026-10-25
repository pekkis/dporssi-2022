import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

// The dictator search filters.
export const panel = style({
  padding: vars.space[3],
  backgroundColor: vars.color.superLight,
  borderRadius: vars.radius[1],
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: vars.color.light,
  display: "block",
  flexWrap: "wrap",
  "@media": { [media.tablet]: { display: "flex" } }
});

export const searchColumn = style({
  paddingRight: 0,
  paddingBottom: 0,
  "@media": { [media.tablet]: { paddingRight: vars.space[4] } }
});

export const column = style({
  paddingRight: 0,
  paddingBottom: vars.space[3],
  "@media": {
    [media.tablet]: { paddingRight: vars.space[4], paddingBottom: 0 }
  }
});
