import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const grid = style({
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
  height: "100%",
  marginLeft: 0,
  marginRight: 0,
  marginTop: vars.space[4],
  marginBottom: vars.space[4]
});
