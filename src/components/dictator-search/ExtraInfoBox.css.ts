import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const extraInfo = style({
  fontStyle: "italic",
  marginTop: vars.space[1],
  fontSize: vars.fontSize[1]
});
