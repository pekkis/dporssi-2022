import { style } from "@vanilla-extract/css";

export const screen = style({
  display: "flex",
  placeContent: "center"
});

export const note = style({
  maxWidth: "300px",
  transform: "rotate(1.5deg)",
  fontFamily: "Comic Sans MS"
});
