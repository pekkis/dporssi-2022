import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const error = style({
  marginTop: `calc(${vars.space[3]} * -1)`,
  color: vars.color.primary,
  marginBottom: vars.space[3]
});

export const box = style({
  padding: vars.space[3],
  borderWidth: "1px",
  borderRadius: vars.radius[1],
  borderStyle: "solid",
  borderColor: vars.color.muted
});

export const form = style({ marginTop: vars.space[3] });

export const notice = style({ fontStyle: "italic" });
