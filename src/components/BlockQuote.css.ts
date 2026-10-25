import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const blockQuote = style({
  fontStyle: "italic",
  borderRadius: vars.radius[1],
  backgroundColor: vars.color.superLight,
  borderLeftColor: vars.color.veryLight,
  borderLeftStyle: "solid",
  // borderWidths[4] in the old theme.
  borderLeftWidth: "8px",
  marginTop: vars.space[3],
  marginBottom: vars.space[3],
  marginLeft: 0,
  marginRight: 0,
  padding: vars.space[3],
  "::before": {
    color: vars.color.light,
    content: "open-quote",
    fontSize: vars.fontSize[7],
    lineHeight: "0",
    marginRight: vars.space[3],
    verticalAlign: "-0.4em"
  }
});
