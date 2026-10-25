import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const card = style({ cursor: "pointer", position: "relative" });

// Dictators that don't match the current filter fade out.
export const state = styleVariants({
  active: [card, { opacity: 1 }],
  faded: [card, { opacity: 0.66, filter: "grayscale(100%) sepia(50%)" }]
});

export const imageBox = style({ position: "relative" });

export const ranking = style({
  fontSize: vars.fontSize[1],
  textAlign: "center",
  width: "2em",
  margin: 0,
  position: "absolute",
  top: `calc(${vars.space[1]} * -1)`,
  right: `calc(${vars.space[1]} * -1)`,
  zIndex: vars.zIndex[3],
  color: vars.color.white,
  backgroundColor: vars.color.link,
  borderRadius: vars.radius[1],
  paddingTop: "4px",
  paddingBottom: "4px"
});

export const image = style({
  borderStyle: "solid",
  borderColor: vars.color.link,
  borderWidth: "1px",
  borderRadius: vars.radius[1],
  display: "block"
});

export const caption = style({
  overflow: "hidden",
  textOverflow: "ellipsis"
});

// The name link covers the whole card, so the picture is clickable too.
export const cardLink = style({
  "::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: vars.zIndex[4]
  }
});
