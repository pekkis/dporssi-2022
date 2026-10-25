import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const author = style({
  fontWeight: vars.fontWeight.bold,
  marginBottom: vars.space[1]
});

export const reply = style({
  fontStyle: "italic",
  marginTop: vars.space[2],
  marginBottom: vars.space[2]
});
