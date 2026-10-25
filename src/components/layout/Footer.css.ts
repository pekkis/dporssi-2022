import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const footer = style({
  gridArea: "footer",
  textAlign: "center",
  padding: vars.space[3],
  backgroundColor: vars.color.veryDark,
  color: vars.color.veryLight
});

export const logo = style({
  width: "50px",
  margin: "0 auto"
});

export const heading = style({
  fontSize: vars.fontSize[2],
  textTransform: "uppercase"
});

export const social = style({
  fontSize: vars.fontSize[4],
  marginLeft: vars.space[2],
  marginRight: vars.space[2],
  marginTop: vars.space[1],
  marginBottom: vars.space[1]
});

export const links = style({
  margin: 0,
  padding: 0,
  listStyleType: "none"
});

export const linkItem = style({
  display: "inline-block",
  listStylePosition: "inside",
  margin: 0,
  padding: 0,
  paddingRight: vars.space[2],
  paddingBottom: vars.space[1]
});

export const licenseImage = style({
  verticalAlign: "middle",
  marginRight: vars.space[1]
});
