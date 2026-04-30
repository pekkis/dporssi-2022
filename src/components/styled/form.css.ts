import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const input = style({
  display: "block",
  width: "100%",
  padding: themeContract.space["2"],
  appearance: "none",
  fontSize: "inherit",
  fontFamily: "inherit",
  lineHeight: "inherit",
  border: "1px solid",
  borderColor: themeContract.colors.text,
  borderRadius: themeContract.radii["2"],
  color: "inherit",
  background: "transparent",
  marginBottom: themeContract.space["3"]
});

export const textarea = style([
  input,
  {
    minHeight: "120px"
  }
]);

export const label = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  fontSize: themeContract.fontSizes["1"],
  fontWeight: themeContract.fontWeights.bold
});

export const radio = style({
  marginRight: themeContract.space["1"]
});

export const menuButton = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  color: "currentColor",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: themeContract.space["1"],
  width: "32px",
  height: "32px",
  cursor: "pointer"
});
