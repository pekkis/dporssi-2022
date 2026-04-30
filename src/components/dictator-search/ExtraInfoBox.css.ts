import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const extraInfo = style({
  fontStyle: "italic",
  marginTop: themeContract.space["1"],
  fontSize: themeContract.fontSizes["1"]
});