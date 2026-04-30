import { style } from "@vanilla-extract/css";
import { themeContract, breakpoints } from "@/styles/theme.css";

export const menuList = style({
  display: "block",
  width: "100%",
  margin: 0,
  padding: 0,
  listStyleType: "none",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "flex-end",
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "flex"
    }
  }
});

export const menuItem = style({
  display: "inline-block",
  marginRight: themeContract.space["1"],
  marginLeft: themeContract.space["1"]
});