import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const overlay = style({
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, .2)",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 3
});

export const header = style({
  gridArea: "header",
  position: "sticky",
  overflow: "visible",
  zIndex: 5,
  top: 0,
  left: 0,
  right: 0,
  boxShadow: "1px 1px 5px rgba(0, 0, 0, .5)",
  background: themeContract.colors.primary
});

export const headerInner = style({
  display: "flex",
  zIndex: 5,
  justifyContent: "center",
  alignItems: "stretch",
  width: "100%"
});

export const adiSlot = style({
  flex: "0 0 50px",
  alignSelf: "center"
});

export const titleSlot = style({
  flex: "0 0 auto",
  alignSelf: "center",
  textAlign: "center"
});

export const title = style({
  textShadow: `2px 2px 2px ${themeContract.colors.black}`,
  color: themeContract.colors.white
});

export const menuSlot = style({
  flex: "1 1 auto",
  alignSelf: "center",
  color: themeContract.colors.white,
  textAlign: "right"
});

export const menuButtonShadow = style({
  filter: "drop-shadow(1px 1px 1px #000)",
  cursor: "pointer"
});

export const adiClickable = style({
  cursor: "pointer"
});
