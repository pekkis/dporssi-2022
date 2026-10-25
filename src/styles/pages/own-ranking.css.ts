import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const handle = style({
  display: "flex",
  alignItems: "center",
  backgroundColor: vars.color.veryLight,
  padding: vars.space[2]
});

export const portrait = style({
  alignSelf: "center",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: vars.color.light,
  borderRadius: vars.radius[1],
  marginLeft: vars.space[1],
  marginRight: vars.space[1]
});

export const lists = style({
  marginLeft: vars.space[2],
  marginRight: vars.space[2],
  display: "block",
  gridTemplateColumns: "1fr 1fr",
  columnGap: vars.space[4],
  "@media": { [media.tablet]: { display: "grid" } }
});

export const row = style({
  display: "flex",
  width: "100%",
  marginTop: vars.space[1],
  marginBottom: vars.space[1],
  placeItems: "stretch",
  borderRadius: vars.radius[1],
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: vars.color.light,
  alignContent: "stretch",
  alignItems: "stretch"
});

export const rankedName = style({
  display: "flex",
  alignItems: "center",
  paddingTop: vars.space[2],
  paddingBottom: vars.space[2]
});

export const name = style({
  display: "flex",
  alignItems: "center",
  padding: vars.space[2]
});

export const action = style({
  flexGrow: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: vars.space[2]
});
