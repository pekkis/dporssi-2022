import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const menu = style({
  backgroundColor: vars.color.primary,
  color: vars.color.white
});

export const nav = style({
  marginLeft: vars.space[2],
  marginRight: vars.space[2],
  marginBottom: vars.space[2]
});
