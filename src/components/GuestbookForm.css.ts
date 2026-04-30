import { style } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const formContainer = style({
  padding: themeContract.space["3"],
  borderWidth: "1px",
  borderRadius: themeContract.radii["1"],
  borderStyle: "solid",
  borderColor: themeContract.colors.muted
});

export const errorBox = style({
  marginTop: `-${themeContract.space["3"]}`,
  color: themeContract.colors.primary,
  marginBottom: themeContract.space["3"]
});

export const formBody = style({
  marginTop: themeContract.space["3"]
});

export const italicMessage = style({
  fontStyle: "italic"
});
