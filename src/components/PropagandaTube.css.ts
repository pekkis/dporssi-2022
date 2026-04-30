import { style, globalStyle } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const tubeNav = style({
  display: "flex",
  marginTop: themeContract.space["1"],
  marginBottom: themeContract.space["1"],
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center"
});

export const arrowSlot = style({
  fontSize: themeContract.fontSizes["4"],
  alignSelf: "flex-start"
});

export const arrow = {
  enabled: style({ cursor: "pointer", opacity: 1 }),
  disabled: style({ cursor: "not-allowed", opacity: 0.2 })
};

export const titleSlot = style({
  paddingLeft: themeContract.space["2"],
  paddingRight: themeContract.space["2"]
});

export const ukraineWrap = style({
  position: "relative",
  paddingBottom: "56.25%",
  height: 0
});

globalStyle(`${ukraineWrap} > div`, {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
});

export const ukraineFlex = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});
