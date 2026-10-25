import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const category = style({ marginBottom: vars.space[4] });

// Grid placement for categories that need one, by category name.
export const placement = styleVariants({
  "Luonne ja persoona": {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 10
  }
});

export const tagName = style({
  display: "inline-block",
  backgroundColor: vars.color.primary,
  color: vars.color.white,
  width: "auto",
  margin: "0 0 auto 0",
  padding: vars.space[1],
  borderRadius: vars.radius[1],
  fontWeight: vars.fontWeight.light
});
