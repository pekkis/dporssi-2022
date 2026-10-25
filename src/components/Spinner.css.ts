import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(359deg)" }
});

export const spinner = style({
  marginRight: vars.space[2],
  animation: `${spin} 5s infinite linear`
});
