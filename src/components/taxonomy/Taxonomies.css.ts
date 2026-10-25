import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const list = style({
  listStyleType: "none",
  listStylePosition: "outside",
  marginTop: vars.space[1],
  marginBottom: vars.space[1],
  padding: 0
});
