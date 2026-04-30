import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { themeContract, breakpoints } from "./theme.css";

/**
 * Mobile-first responsive conditions. Equivalent to theme-ui's array
 * shorthand `[mobile, tablet, desktop]` — the legacy theme used
 * breakpoints `[768, 992]`, so the same values land here.
 */
const conditions = {
  mobile: {},
  tablet: { "@media": `screen and (min-width: ${breakpoints.tablet}px)` },
  desktop: { "@media": `screen and (min-width: ${breakpoints.desktop}px)` }
} as const;

const space = themeContract.space;
const colors = themeContract.colors;
const fontSizes = themeContract.fontSizes;
const fontWeights = themeContract.fontWeights;
const radii = themeContract.radii;
const borderWidths = themeContract.borderWidths;
const zIndices = themeContract.zIndices;
const sizes = themeContract.sizes;

const responsiveProperties = defineProperties({
  conditions,
  defaultCondition: "mobile",
  responsiveArray: ["mobile", "tablet", "desktop"],
  properties: {
    display: [
      "none",
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid"
    ],
    flexDirection: ["row", "row-reverse", "column", "column-reverse"],
    flexWrap: ["nowrap", "wrap", "wrap-reverse"],
    justifyContent: [
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "stretch"
    ],
    alignItems: ["flex-start", "flex-end", "center", "stretch", "baseline"],
    alignSelf: [
      "flex-start",
      "flex-end",
      "center",
      "stretch",
      "baseline",
      "auto"
    ],
    alignContent: [
      "flex-start",
      "flex-end",
      "center",
      "stretch",
      "space-between",
      "space-around"
    ],
    textAlign: ["left", "center", "right"],
    margin: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    padding: space,
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    gap: space,
    rowGap: space,
    columnGap: space,
    fontSize: fontSizes,
    width: { ...space, full: "100%", auto: "auto", container: sizes.container },
    maxWidth: { ...space, full: "100%", container: sizes.container },
    minWidth: { "0": "0", auto: "auto" },
    height: { ...space, full: "100%", auto: "auto", screen: "100vh" },
    maxHeight: { ...space, full: "100%" },
    minHeight: { ...space, screen: "100vh" }
  },
  shorthands: {
    m: ["margin"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    p: ["padding"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"]
  }
});

/**
 * Non-responsive properties. These rarely vary by breakpoint in this
 * codebase and benefit from a smaller class footprint.
 */
const staticProperties = defineProperties({
  properties: {
    color: colors,
    background: colors,
    backgroundColor: colors,
    borderColor: colors,
    borderRadius: radii,
    borderWidth: borderWidths,
    borderStyle: ["none", "solid", "dashed", "dotted"],
    fontWeight: fontWeights,
    textDecoration: ["none", "underline", "line-through"],
    textTransform: ["none", "uppercase", "lowercase", "capitalize"],
    cursor: ["auto", "pointer", "default", "not-allowed", "wait"],
    overflow: ["visible", "hidden", "auto", "scroll"],
    overflowX: ["visible", "hidden", "auto", "scroll"],
    overflowY: ["visible", "hidden", "auto", "scroll"],
    whiteSpace: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"],
    position: ["static", "relative", "absolute", "fixed", "sticky"],
    zIndex: zIndices,
    listStyleType: ["none", "disc", "decimal", "circle", "square"],
    verticalAlign: [
      "baseline",
      "top",
      "middle",
      "bottom",
      "text-top",
      "text-bottom",
      "sub",
      "super"
    ]
  },
  shorthands: {
    bg: ["backgroundColor"]
  }
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  staticProperties
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
