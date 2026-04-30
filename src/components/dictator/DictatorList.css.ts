import { style, globalStyle } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const dictatorCard = style({
  display: "grid",
  gridTemplateColumns: "100px auto",
  gap: themeContract.space["2"]
});

export const imageSlot = style({
  gridRowStart: 1,
  gridColumnStart: 1,
  gridRowEnd: 2
});

export const infoSlot = style({
  gridRowStart: 1,
  gridRowEnd: 2,
  gridColumnStart: 2
});

export const synopsisSlot = style({
  gridRowStart: 2,
  gridColumnStart: 1,
  gridColumnEnd: 3
});

export const dictatorImage = style({
  borderStyle: "solid",
  borderColor: themeContract.colors.link,
  borderWidth: "1px",
  borderRadius: themeContract.radii["1"],
  display: "block"
});

export const dataTable = style({});
globalStyle(`${dataTable} th`, {
  textAlign: "left",
  verticalAlign: "top"
});
