import { globalStyle } from "@vanilla-extract/css";
import { reset } from "./layers.css";
import { vars } from "./theme.css";

// What theme-ui's provider injected globally: border-box everywhere, no body margin, and
// the theme's `styles.root` on <html>. Our root replaced the preset's, so it sets no
// line-height (the body line-height comes from the components that ask for it).
globalStyle("*", { "@layer": { [reset]: { boxSizing: "border-box" } } });

globalStyle("html", {
  "@layer": {
    [reset]: {
      fontFamily: vars.font.body,
      fontWeight: vars.fontWeight.body,
      fontSize: vars.fontSize[2]
    }
  }
});

globalStyle("html p", {
  "@layer": {
    [reset]: { marginTop: vars.space[3], marginBottom: vars.space[3] }
  }
});

globalStyle("html p:first-of-type", {
  "@layer": { [reset]: { marginTop: 0 } }
});

globalStyle("html p:last-of-type", {
  "@layer": { [reset]: { marginBottom: 0 } }
});

globalStyle("body", { "@layer": { [reset]: { margin: 0 } } });

globalStyle(".grecaptcha-badge", {
  "@layer": { [reset]: { visibility: "hidden" } }
});
