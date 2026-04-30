import { style } from "@vanilla-extract/css";
import { breakpoints, themeContract } from "@/styles/theme.css";

export const storySection = style({
  marginTop: themeContract.space["3"],
  marginBottom: themeContract.space["3"],
  display: "block",
  width: "100%",
  alignItems: "stretch",
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "flex"
    }
  }
});

export const storyImage = style({
  width: "100%",
  flexGrow: 2,
  order: 2,
  marginLeft: 0,
  marginBottom: themeContract.space["4"],
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      width: "50%",
      marginLeft: themeContract.space["4"],
      marginBottom: 0
    }
  }
});

export const storyText = style({
  width: "100%",
  order: 1
});
