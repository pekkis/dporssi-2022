import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const footer = style({
  gridArea: "footer",
  textAlign: "center",
  background: themeContract.colors.veryDark,
  color: themeContract.colors.veryLight
});

export const adiWrap = style({
  width: "50px",
  margin: "0 auto"
});

export const heading = style({
  fontSize: themeContract.fontSizes["2"],
  textTransform: "uppercase"
});

export const linkList = style({
  margin: 0,
  padding: 0,
  listStyleType: "none"
});

export const linkItem = style({
  display: "inline-block",
  listStylePosition: "inside",
  margin: 0,
  padding: 0,
  paddingRight: themeContract.space["2"],
  paddingBottom: themeContract.space["1"]
});

export const ccImage = style({
  verticalAlign: "middle",
  marginRight: themeContract.space["1"]
});
