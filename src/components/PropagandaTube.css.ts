import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const controls = style({
  marginTop: vars.space[1],
  marginBottom: vars.space[1],
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center"
});

export const arrowBox = style({
  fontSize: vars.fontSize[4],
  alignSelf: "flex-start"
});

export const arrow = styleVariants({
  enabled: { cursor: "pointer", opacity: 1 },
  disabled: { cursor: "not-allowed", opacity: 0.2 }
});

export const caption = style({
  paddingLeft: vars.space[2],
  paddingRight: vars.space[2]
});

export const flagFrame = style({
  position: "relative",
  paddingBottom: "56.25%",
  height: 0
});

globalStyle(`${flagFrame} div`, {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
});

export const flag = style({
  alignItems: "center",
  justifyContent: "center"
});
