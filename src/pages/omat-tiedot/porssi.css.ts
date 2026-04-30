import { style } from "@vanilla-extract/css";
import { breakpoints, themeContract } from "@/styles/theme.css";

export const handle = style({
  display: "flex",
  alignItems: "center",
  backgroundColor: themeContract.colors.veryLight,
  padding: themeContract.space["2"]
});

export const dictatorImage = style({
  alignSelf: "center",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: themeContract.colors.light,
  borderRadius: themeContract.radii["1"],
  marginLeft: themeContract.space["1"],
  marginRight: themeContract.space["1"]
});

export const twoColumns = style({
  display: "block",
  columnGap: themeContract.space["4"],
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }
});

export const row = style({
  display: "flex",
  width: "100%",
  marginTop: themeContract.space["1"],
  marginBottom: themeContract.space["1"],
  placeItems: "stretch",
  borderRadius: themeContract.radii["1"],
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: themeContract.colors.light,
  alignContent: "stretch",
  alignItems: "stretch"
});

export const rowLabel = style({
  display: "flex",
  alignItems: "center"
});

export const rowAction = style({
  flexGrow: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end"
});
