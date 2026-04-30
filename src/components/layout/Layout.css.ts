import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "grid",
  minHeight: "100vh",
  gridTemplateAreas: `
    "header"
    "main"
    "footer"
  `,
  gridTemplateRows:
    "[header] minmax(min-content, max-content) [main] minmax(min-content, max-content) [footer] minmax(min-content, 1fr)"
});

export const main = style({
  gridArea: "main",
  height: "100%"
});