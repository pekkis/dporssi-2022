import { style } from "@vanilla-extract/css";
import { breakpoints, themeContract } from "@/styles/theme.css";

export const grid = style({
  display: "grid",
  gap: themeContract.space["4"],
  gridTemplateAreas: `
    "header"
    "fakeNews"
    "propagandaTube"
    "dictators"
  `,
  "@media": {
    [`screen and (min-width: ${breakpoints.tablet}px)`]: {
      gridTemplateAreas: `
        "header header"
        "fakeNews propagandaTube"
        "dictators dictators"
      `
    }
  }
});

export const headerArea = style({ gridArea: "header" });
export const newsArea = style({ gridArea: "fakeNews" });
export const tubeArea = style({ gridArea: "propagandaTube" });
export const dictatorsArea = style({ gridArea: "dictators" });
