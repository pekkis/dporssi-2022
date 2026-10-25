import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const item = style({
  display: "grid",
  gridTemplateColumns: "100px auto",
  gap: vars.space[2],
  marginTop: vars.space[4],
  marginBottom: vars.space[4]
});

export const image = style({
  gridRowStart: 1,
  gridColumnStart: 1,
  gridRowEnd: 2
});

export const portrait = style({
  borderStyle: "solid",
  borderColor: vars.color.link,
  borderWidth: "1px",
  borderRadius: vars.radius[1],
  display: "block"
});

export const details = style({
  gridRowStart: 1,
  gridRowEnd: 2,
  gridColumnStart: 2
});

export const facts = style({});

globalStyle(`${facts} th`, {
  textAlign: "left",
  verticalAlign: "top"
});

export const synopsis = style({
  gridRowStart: 2,
  gridColumnStart: 1,
  gridColumnEnd: 3
});
