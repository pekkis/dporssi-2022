import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const tag = style({
  display: "inline-block",
  marginRight: vars.space[1],
  marginBottom: vars.space[1],
  padding: vars.space[1],
  backgroundColor: vars.color.primary,
  color: vars.color.white,
  borderRadius: "5px",
  fontWeight: vars.fontWeight.light
});
