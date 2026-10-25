import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const categories = style({
  display: "block",
  gridTemplateColumns: "1fr 1fr",
  columnGap: vars.space[4],
  "@media": { [media.tablet]: { display: "grid" } }
});
