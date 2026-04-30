import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle
} from "@vanilla-extract/css";

/**
 * Design tokens migrated from the legacy theme-ui theme
 * (see git history of src/services/theme.ts). Names, values and
 * scales must stay identical so that visual diffs remain near-zero.
 */

const tokens = {
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#de0000",
    primaryDark: "#d40000", // darken("primary", 0.05)
    secondary: "#306",
    muted: "#ccc",
    black: "#000",
    white: "#fff",
    disabled: "rgb(99, 99, 99)",
    link: "rgb(12, 12, 12)",
    superLight: "rgb(245, 245, 245)",
    extraLight: "rgb(235, 235, 235)",
    veryLight: "rgb(230, 230, 230)",
    light: "rgb(200, 200, 200)",
    notSoLight: "rgb(175, 175, 175)",
    veryDark: "rgb(12, 12, 12)",
    transparent: "transparent"
  },
  space: {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "16px",
    "4": "32px",
    "5": "64px",
    "6": "128px",
    "7": "256px",
    "8": "512px"
  },
  fontSizes: {
    "0": "12px",
    "1": "14px",
    "2": "16px",
    "3": "20px",
    "4": "24px",
    "5": "32px",
    "6": "48px",
    "7": "64px"
  },
  fontWeights: {
    light: "200",
    body: "400",
    normal: "400",
    bold: "700",
    heading: "700"
  },
  lineHeights: {
    body: "1.4",
    heading: "1.25"
  },
  fonts: {
    body: "barlow, sans-serif",
    heading: "barlow, sans-serif",
    monospace: "Menlo, monospace"
  },
  borderWidths: {
    "0": "0",
    "1": "1px",
    "2": "2px",
    "3": "4px",
    "4": "8px"
  },
  radii: {
    "0": "0",
    "1": "2px",
    "2": "4px",
    "3": "500%"
  },
  zIndices: {
    "0": "-10",
    "1": "0",
    "2": "10",
    "3": "100",
    "4": "1000",
    "5": "10000",
    "6": "100000"
  },
  sizes: {
    container: "1200px"
  }
};

export const themeContract = createGlobalThemeContract(
  tokens,
  (_, path) => `dp-${path.join("-")}`
);

createGlobalTheme(":root", themeContract, tokens);

/**
 * Breakpoints — also expressed as raw values for sprinkles consumption.
 */
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 992
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Replaces what theme-ui used to inject at <ThemeUIProvider> mount time:
 * the `styles.root` rules, paragraph spacing, and the .grecaptcha-badge
 * visibility hack from the old App.tsx <Global /> block.
 */

globalStyle("html, body", {
  padding: 0,
  margin: 0
});

globalStyle("body", {
  fontFamily: themeContract.fonts.body,
  fontWeight: themeContract.fontWeights.body,
  fontSize: themeContract.fontSizes["2"],
  lineHeight: themeContract.lineHeights.body,
  color: themeContract.colors.text,
  background: themeContract.colors.background
});

globalStyle("a", {
  color: themeContract.colors.link
});

globalStyle("*", {
  boxSizing: "border-box"
});

globalStyle("p", {
  marginTop: themeContract.space["3"],
  marginBottom: themeContract.space["3"]
});

globalStyle("p:first-of-type", {
  marginTop: 0
});

globalStyle("p:last-of-type", {
  marginBottom: 0
});

globalStyle(".grecaptcha-badge", {
  visibility: "hidden"
});
