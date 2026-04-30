import { style } from "@vanilla-extract/css";
import { breakpoints, themeContract } from "@/styles/theme.css";

export const grid = style({
  display: "block",
  columnGap: themeContract.space["4"],
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "grid",
      gridTemplateColumns: "auto 300px"
    }
  }
});

export const imageSlot = style({
  gridRowStart: 1,
  gridColumnStart: 2
});

export const textSlot = style({
  gridRowStart: 1,
  gridColumnStart: 1
});
