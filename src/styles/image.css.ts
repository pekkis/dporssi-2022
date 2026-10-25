import { style } from "@vanilla-extract/css";

// next/image renders the image at its intrinsic size; this lets it shrink to its column
// (keeping the aspect ratio) instead of overflowing the page.
export const responsiveImage = style({
  maxWidth: "100%",
  height: "auto"
});
