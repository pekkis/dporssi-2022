import { style } from "@vanilla-extract/css";

export const dictatorGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))"
});
