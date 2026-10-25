import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const heading = style({
  marginBottom: vars.space[3],
  placeItems: "center",
  justifyContent: "start"
});

export const toggle = style({
  marginLeft: vars.space[3],
  fontSize: vars.fontSize[2]
});
