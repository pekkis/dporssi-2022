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

export const toggleButton = style({
  appearance: "none",
  background: "none",
  border: 0,
  padding: 0,
  font: "inherit",
  textDecoration: "underline",
  cursor: "pointer"
});
