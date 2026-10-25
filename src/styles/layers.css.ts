import { layer } from "@vanilla-extract/css";

// Cascade layers make the old theme-ui precedence explicit: global resets lose to the UI
// primitives' base styles, which lose to every component's own (unlayered) styles and the
// sprinkles, regardless of the order bundles load CSS in. Declared in precedence order.
export const reset = layer("reset");
export const ui = layer("ui");
