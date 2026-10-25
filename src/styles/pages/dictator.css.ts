import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const article = style({
  display: "block",
  gridTemplateColumns: "4fr 2fr",
  columnGap: vars.space[4],
  "@media": { [media.tablet]: { display: "grid" } }
});

export const header = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,
  marginBottom: vars.space[4]
});

export const synopsis = style({
  marginTop: vars.space[3],
  fontSize: vars.fontSize[3]
});

export const facts = style({
  gridRowStart: 2,
  gridColumnStart: 2,
  gridColumnEnd: 3
});

export const portrait = style({
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: vars.color.veryDark,
  borderRadius: vars.radius[1],
  position: "relative"
});

export const content = style({
  gridRowStart: 2,
  gridColumnStart: 1,
  gridRowEnd: 4
});
