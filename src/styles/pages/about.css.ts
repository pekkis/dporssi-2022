import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const story = style({
  marginTop: vars.space[3],
  marginBottom: vars.space[3],
  display: "block",
  width: "100%",
  alignItems: "stretch",
  "@media": { [media.tablet]: { display: "flex" } }
});

export const storyImage = style({
  width: "100%",
  flexGrow: 2,
  order: 2,
  marginLeft: 0,
  marginBottom: vars.space[4],
  "@media": {
    [media.tablet]: {
      width: "50%",
      marginLeft: vars.space[4],
      marginBottom: 0
    }
  }
});

export const storyText = style({
  width: "100%",
  order: 1
});
