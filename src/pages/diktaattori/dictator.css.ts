import { style } from "@vanilla-extract/css";
import { breakpoints, themeContract } from "@/styles/theme.css";

export const article = style({
  display: "block",
  columnGap: themeContract.space["4"],
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "grid",
      gridTemplateColumns: "4fr 2fr"
    }
  }
});

export const headerSlot = style({
  gridColumnStart: 1,
  gridColumnEnd: 3
});

export const synopsisSlot = style({
  marginTop: themeContract.space["3"],
  fontSize: themeContract.fontSizes["3"]
});

export const sidebarSlot = style({
  gridRowStart: 2,
  gridColumnStart: 2,
  gridColumnEnd: 3
});

export const portraitFrame = style({
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: themeContract.colors.veryDark,
  borderRadius: themeContract.radii["1"],
  position: "relative"
});

export const storySlot = style({
  gridRowStart: 2,
  gridColumnStart: 1,
  gridRowEnd: 4
});
