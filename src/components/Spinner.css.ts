import { keyframes, style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

const faSpin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(359deg)" }
});

export const spinner = style({
  marginRight: themeContract.space["2"],
  animation: `${faSpin} 5s infinite linear`
});