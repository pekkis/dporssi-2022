import { style } from "@vanilla-extract/css";
import { themeContract, breakpoints } from "@/styles/theme.css";

export const filtersBox = style({
  padding: themeContract.space["3"],
  backgroundColor: themeContract.colors.superLight,
  borderRadius: themeContract.radii["1"],
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: themeContract.colors.light,
  display: "block",
  flexWrap: "wrap",
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      display: "flex"
    }
  }
});

/**
 * The "padding right 4 on tablet+" column wrapper used for each filter
 * group in <Filters>.
 */
export const filterColumn = style({
  paddingRight: 0,
  paddingBottom: themeContract.space["3"],
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      paddingRight: themeContract.space["4"],
      paddingBottom: 0
    }
  }
});

/**
 * Variant without bottom padding on mobile (for the first / search-text
 * column).
 */
export const filterColumnTight = style({
  paddingRight: 0,
  paddingBottom: 0,
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      paddingRight: themeContract.space["4"]
    }
  }
});
