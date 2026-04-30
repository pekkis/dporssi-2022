import { style, styleVariants } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const card = styleVariants({
  highlighted: { cursor: "pointer", opacity: 1 },
  fadedOut: {
    cursor: "pointer",
    opacity: 0.66,
    filter: "grayscale(100%) sepia(50%)"
  }
});

export const imageWrap = style({
  position: "relative"
});

export const ranking = style({
  fontSize: themeContract.fontSizes["1"],
  textAlign: "center",
  width: "2em",
  margin: 0,
  position: "absolute",
  fontWeight: themeContract.fontWeights.bold,
  top: "-1px",
  right: "-1px",
  zIndex: 3,
  color: themeContract.colors.white,
  backgroundColor: themeContract.colors.link,
  borderRadius: themeContract.radii["1"],
  paddingTop: "4px",
  paddingBottom: "4px"
});

export const portrait = style({
  borderStyle: "solid",
  borderColor: themeContract.colors.link,
  borderWidth: "1px",
  borderRadius: themeContract.radii["1"],
  display: "block"
});

export const nameWrap = style({
  overflow: "hidden",
  textOverflow: "ellipsis"
});
