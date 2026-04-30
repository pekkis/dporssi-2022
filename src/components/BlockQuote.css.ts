import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const blockquote = style({
  fontStyle: "italic",
  borderRadius: themeContract.radii["1"],
  backgroundColor: themeContract.colors.superLight,
  borderLeftColor: themeContract.colors.veryLight,
  borderLeftStyle: "solid",
  borderLeftWidth: themeContract.borderWidths["3"],
  marginTop: themeContract.space["3"],
  marginBottom: themeContract.space["3"],
  marginLeft: 0,
  marginRight: 0,
  padding: themeContract.space["3"],
  selectors: {
    "&:before": {
      color: themeContract.colors.light,
      content: "open-quote",
      fontSize: themeContract.fontSizes["7"],
      lineHeight: 0,
      marginRight: themeContract.space["3"],
      verticalAlign: "-0.4em"
    }
  }
});
