import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const article = style({
  display: "grid",
  gap: vars.space[4],
  gridTemplateColumns: "1fr",
  gridTemplateAreas: `
            "header"
            "sidebar"
            "main"
          `,
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "2fr 1fr",
      gridTemplateAreas: `
          "header header"
          "main sidebar"
        `
    }
  }
});

export const header = style({ gridArea: "header" });

export const description = style({
  fontStyle: "italic",
  marginTop: vars.space[3]
});

export const sidebar = style({ gridArea: "sidebar", alignSelf: "start" });

export const main = style({ gridArea: "main" });
