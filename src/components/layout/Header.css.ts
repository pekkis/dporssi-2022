import { globalStyle, style } from "@vanilla-extract/css";
import { media } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const topMenu = "70px";

export const overlay = style({
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, .2)",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: vars.zIndex[3]
});

export const header = style({
  gridArea: "header",
  position: "sticky",
  overflow: "visible",
  zIndex: vars.zIndex[5],
  top: 0,
  left: 0,
  right: 0,
  minHeight: topMenu,
  boxShadow: "1px 1px 5px rgba(0, 0, 0, .5)",
  backgroundColor: vars.color.primary
});

export const bar = style({
  zIndex: vars.zIndex[5],
  height: topMenu,
  justifyContent: "center",
  alignItems: "stretch",
  width: "100%"
});

export const logo = style({
  flex: "0 0 50px",
  alignSelf: "center",
  margin: vars.space[1]
});

export const logoImage = style({ cursor: "pointer" });

export const titleBox = style({
  flex: "0 0 auto",
  alignSelf: "center",
  textAlign: "center",
  padding: 0,
  marginLeft: vars.space[2]
});

export const title = style({
  color: vars.color.white,
  textShadow: `2px 2px 2px ${vars.color.black}`
});

export const menuBox = style({
  flex: "1 1 auto",
  alignSelf: "center",
  color: vars.color.white,
  textAlign: "right",
  margin: vars.space[1]
});

export const menuButton = style({
  filter: "drop-shadow(1px 1px 1px #000)",
  cursor: "pointer"
});

// The desktop menu: nested selectors, like the old `sx`, so they also reach the <li> that
// UserMenu renders itself.
export const mainMenu = style({});

globalStyle(`${mainMenu} ul`, {
  display: "block",
  "@media": { [media.tablet]: { display: "flex" } }
});

globalStyle(`${mainMenu} li`, {
  display: "inline-block",
  marginLeft: vars.space[1],
  marginRight: vars.space[1]
});
