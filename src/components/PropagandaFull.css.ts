import { style } from "@vanilla-extract/css";
import { breakpoints } from "@/styles/theme.css";

export const fullArticle = style({
  display: "grid",
  gap: "32px",
  gridTemplateColumns: "1fr",
  gridTemplateAreas: `
    "header"
    "sidebar"
    "main"
  `,
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      gridTemplateColumns: "2fr 1fr",
      gridTemplateAreas: `
        "header header"
        "main sidebar"
      `
    }
  }
});

export const headerArea = style({ gridArea: "header" });
export const sidebarArea = style({ gridArea: "sidebar", alignSelf: "start" });
export const mainArea = style({ gridArea: "main" });
export const italic = style({ fontStyle: "italic" });
