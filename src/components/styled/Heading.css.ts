import { style, styleVariants } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const headingBase = style({
  color: themeContract.colors.text,
  fontFamily: themeContract.fonts.heading,
  fontWeight: themeContract.fontWeights.heading,
  lineHeight: themeContract.lineHeights.heading,
  margin: 0
});

/**
 * Maps heading levels to font size tokens, matching the theme-ui
 * `base` preset that the legacy theme inherited from:
 *   h1 -> fontSize 5, h2 -> 4, h3 -> 3, h4 -> 2, h5 -> 1, h6 -> 0.
 */
export const headingSize = styleVariants({
  h1: { fontSize: themeContract.fontSizes["5"] },
  h2: { fontSize: themeContract.fontSizes["4"] },
  h3: { fontSize: themeContract.fontSizes["3"] },
  h4: { fontSize: themeContract.fontSizes["2"] },
  h5: { fontSize: themeContract.fontSizes["1"] },
  h6: { fontSize: themeContract.fontSizes["0"] }
});
