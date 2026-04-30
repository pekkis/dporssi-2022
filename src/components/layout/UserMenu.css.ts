import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const avatar = style({
  cursor: "pointer",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  display: "block",
  verticalAlign: "middle",
  borderColor: themeContract.colors.white,
  borderStyle: "solid",
  borderWidth: "1px"
});

export const popover = style({
  backgroundColor: themeContract.colors.white,
  padding: themeContract.space["2"],
  color: themeContract.colors.veryDark,
  position: "relative",
  borderColor: themeContract.colors.veryDark,
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: themeContract.radii["1"]
});

export const popoverList = style({
  margin: 0,
  padding: 0,
  textAlign: "center"
});
