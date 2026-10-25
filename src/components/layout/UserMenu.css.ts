import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const avatarButton = style({
  display: "block",
  appearance: "none",
  background: "none",
  border: 0,
  padding: 0,
  cursor: "pointer"
});

export const avatar = style({
  cursor: "pointer",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  display: "block",
  verticalAlign: "middle",
  borderColor: vars.color.white,
  borderStyle: "solid",
  borderWidth: "1px"
});

export const dropdown = style({
  backgroundColor: vars.color.white,
  padding: vars.space[2],
  color: vars.color.veryDark,
  position: "relative",
  borderColor: vars.color.veryDark,
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: vars.radius[1]
});

export const items = style({
  margin: 0,
  padding: 0,
  textAlign: "center"
});
