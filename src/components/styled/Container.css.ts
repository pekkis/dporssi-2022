import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

/**
 * Equivalent of theme-ui's <Container/>: max-width capped at the
 * container size token, horizontally centred.
 */
export const container = style({
  maxWidth: themeContract.sizes.container,
  marginLeft: "auto",
  marginRight: "auto"
});
