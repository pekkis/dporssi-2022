import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const tagList = style({
  listStyleType: "none",
  listStylePosition: "outside",
  marginTop: themeContract.space["1"],
  marginBottom: themeContract.space["1"],
  padding: 0
});

export const tagPill = style({
  display: "inline-block",
  marginRight: themeContract.space["1"],
  marginBottom: themeContract.space["1"],
  padding: themeContract.space["1"],
  backgroundColor: themeContract.colors.primary,
  color: themeContract.colors.white,
  borderRadius: "5px",
  fontWeight: themeContract.fontWeights.light
});

export const tagPillInline = style({
  display: "inline-block",
  backgroundColor: themeContract.colors.primary,
  color: themeContract.colors.white,
  width: "auto",
  margin: 0,
  padding: themeContract.space["1"],
  borderRadius: themeContract.radii["1"],
  fontWeight: themeContract.fontWeights.light
});
