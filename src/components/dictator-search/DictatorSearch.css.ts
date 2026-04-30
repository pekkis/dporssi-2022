import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const filterToggleHeader = style({
  display: "flex",
  marginBottom: themeContract.space["3"],
  placeItems: "center",
  justifyContent: "flex-start"
});

export const toggleLink = style({
  marginLeft: themeContract.space["3"],
  fontSize: themeContract.fontSizes["2"],
  color: themeContract.colors.link
});
