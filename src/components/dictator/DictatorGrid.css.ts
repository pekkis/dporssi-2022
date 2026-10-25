import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const grid = style({
  display: "grid",
  gap: vars.space[2],
  gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
  "@media": { [media.tablet]: { gap: vars.space[3] } }
});
