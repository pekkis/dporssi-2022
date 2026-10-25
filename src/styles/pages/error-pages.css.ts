import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

const pageMargins = {
  marginLeft: vars.space[2],
  marginRight: vars.space[2],
  marginTop: vars.space[2],
  marginBottom: vars.space[3]
};

// 404
export const notFound = style({
  ...pageMargins,
  display: "block",
  gridTemplateColumns: "auto 300px",
  columnGap: vars.space[4],
  "@media": { [media.tablet]: { display: "grid" } }
});

export const notFoundImage = style({
  gridRowStart: 1,
  gridColumnStart: 2
});

export const notFoundText = style({
  marginTop: vars.space[2],
  gridRowStart: 1,
  gridColumnStart: 1
});

// 500
export const serverError = style({
  ...pageMargins,
  display: "flex",
  placeContent: "center"
});

export const serverErrorNote = style({
  marginTop: vars.space[1],
  marginBottom: vars.space[1],
  maxWidth: "300px",
  transform: "rotate(1.5deg)",
  fontFamily: "Comic Sans MS"
});
