import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const externalLink = style({
  color: "inherit",
  whiteSpace: "nowrap",
  selectors: {
    "&.active": {
      fontWeight: themeContract.fontWeights.bold
    }
  }
});

export const externalLinkIcon = style({
  verticalAlign: "middle",
  marginLeft: themeContract.space["1"]
});