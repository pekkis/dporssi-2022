import { style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const grid = style({
  display: "grid",
  gap: vars.space[4],
  gridTemplateAreas: `
              "header"
              "fakeNews"
              "propagandaTube"
              "dictators"
              `,
  "@media": {
    [media.tablet]: {
      gridTemplateAreas: `
            "header header"
            "fakeNews propagandaTube"
            "dictators dictators"
            `
    }
  }
});

export const header = style({ gridArea: "header" });

export const fakeNews = style({ gridArea: "fakeNews" });

export const propagandaTube = style({ gridArea: "propagandaTube" });

export const dictators = style({ gridArea: "dictators" });

export const moreIcon = style({ marginRight: vars.space[1] });

export const allDictators = style({
  fontSize: vars.fontSize[3],
  marginTop: vars.space[2]
});
