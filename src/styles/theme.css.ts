import { createGlobalTheme } from "@vanilla-extract/css";

// The design tokens, the single source of truth for every style. Carried over 1:1 from the
// old theme-ui theme (the `funk` preset plus our overrides): the numeric keys are the old
// scale indices, so `mb: 3` in theme-ui became `vars.space[3]` here.
export const vars = createGlobalTheme(":root", {
  space: {
    0: "0",
    1: "4px",
    2: "8px",
    3: "16px",
    4: "32px",
    5: "64px",
    6: "128px",
    7: "256px",
    8: "512px"
  },
  fontSize: {
    0: "12px",
    1: "14px",
    2: "16px",
    3: "20px",
    4: "24px",
    5: "32px",
    6: "48px",
    7: "64px"
  },
  font: {
    body: "barlow, sans-serif",
    heading: "barlow, sans-serif",
    monospace: "Menlo, monospace"
  },
  fontWeight: {
    body: "400",
    heading: "700",
    normal: "400",
    bold: "700",
    light: "200"
  },
  lineHeight: {
    body: "1.4",
    heading: "1.25"
  },
  color: {
    text: "#000",
    background: "#fff",
    primary: "#de0000",
    // darken("primary", 0.05) in the old theme.
    primaryHover: "#c50000",
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
    veryDark: "rgb(12, 12, 12)"
  },
  radius: {
    0: "0",
    1: "2px",
    2: "4px",
    3: "500%",
    // theme-ui's components used `borderRadius: 4`, outside the scale, i.e. 4px.
    control: "4px",
    round: "9999px"
  },
  zIndex: {
    0: "-10",
    1: "0",
    2: "10",
    3: "100",
    4: "1000",
    5: "10000",
    6: "100000"
  },
  size: {
    container: "1200px"
  }
});
