import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { media } from "./breakpoints";
import { vars } from "./theme.css";

// Spacing utilities for the one-off margins and paddings that theme-ui's `m`, `mt`, `px`…
// props used to set. Responsive like theme-ui's arrays: { mobile, tablet, desktop }.
const spaceProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": media.tablet },
    desktop: { "@media": media.desktop }
  },
  defaultCondition: "mobile",
  properties: {
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space
  },
  shorthands: {
    m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    p: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"]
  }
});

export const sprinkles = createSprinkles(spaceProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
