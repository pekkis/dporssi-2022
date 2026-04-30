import { style } from "@vanilla-extract/css";
import { breakpoints, themeContract } from "@/styles/theme.css";

export const categoryGrid = style({
  display: "block",
  columnGap: themeContract.space["4"],
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }
});
