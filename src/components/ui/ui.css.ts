import { style, type StyleRule } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { ui } from "@/styles/layers.css";
import { vars } from "@/styles/theme.css";

// The UI primitives' base styles, carried over from theme-ui's components. All in the `ui`
// layer, so a component's own (unlayered) class always overrides them, like `sx` did.
const inUi = (rule: StyleRule) => style({ "@layer": { [ui]: rule } });

// Every theme-ui component started from these (Box).
const boxBase: StyleRule = { boxSizing: "border-box", margin: 0, minWidth: 0 };

export const box = inUi(boxBase);

export const flex = inUi({ ...boxBase, display: "flex" });

export const heading = inUi({
  ...boxBase,
  fontFamily: vars.font.heading,
  fontWeight: vars.fontWeight.heading,
  lineHeight: vars.lineHeight.heading
});

// The first and last paragraph of a group lose their outer margin. In theme-ui the global
// `html p:first-of-type` rules beat the component's own margin on specificity.
export const paragraph = inUi({
  ...boxBase,
  fontFamily: vars.font.body,
  fontWeight: vars.fontWeight.body,
  lineHeight: vars.lineHeight.body,
  marginTop: vars.space[3],
  marginBottom: vars.space[3],
  selectors: {
    "&:first-of-type": { marginTop: 0 },
    "&:last-of-type": { marginBottom: 0 }
  }
});

export const container = inUi({
  ...boxBase,
  width: "100%",
  maxWidth: vars.size.container,
  marginLeft: "auto",
  marginRight: "auto"
});

export const button = recipe({
  base: {
    "@layer": {
      [ui]: {
        ...boxBase,
        appearance: "none",
        display: "inline-block",
        textAlign: "center",
        lineHeight: "inherit",
        textDecoration: "none",
        fontSize: "inherit",
        paddingLeft: vars.space[3],
        paddingRight: vars.space[3],
        paddingTop: vars.space[2],
        paddingBottom: vars.space[2],
        border: 0,
        borderRadius: vars.radius.control
      }
    }
  },
  variants: {
    variant: {
      primary: {
        "@layer": {
          [ui]: {
            color: vars.color.background,
            cursor: "pointer",
            backgroundColor: vars.color.primary,
            selectors: {
              "&:hover": { backgroundColor: vars.color.primaryHover },
              "&:disabled": {
                backgroundColor: vars.color.disabled,
                cursor: "not-allowed"
              }
            }
          }
        }
      },
      secondary: {
        "@layer": {
          [ui]: {
            color: vars.color.background,
            backgroundColor: vars.color.secondary
          }
        }
      }
    }
  },
  defaultVariants: { variant: "primary" }
});

// theme-ui's inputs, with the forms.input / forms.textarea variants (mb: 3).
const field: StyleRule = {
  ...boxBase,
  display: "block",
  width: "100%",
  padding: vars.space[2],
  appearance: "none",
  fontSize: "inherit",
  lineHeight: "inherit",
  border: "1px solid",
  borderRadius: vars.radius.control,
  color: "inherit",
  backgroundColor: "transparent",
  marginBottom: vars.space[3],
  selectors: {
    "&:autofill, &:autofill:hover, &:autofill:focus": {
      boxShadow: `inset 0 0 0 1000px ${vars.color.background}`,
      fontSize: "inherit"
    }
  }
};

export const input = inUi(field);

export const textarea = inUi({ ...field, fieldSizing: "content" } as StyleRule);

export const label = inUi({
  ...boxBase,
  width: "100%",
  display: "flex",
  fontSize: vars.fontSize[1],
  fontWeight: vars.fontWeight.bold
});

export const radio = inUi({ ...boxBase, minWidth: "min-content" });

export const radioInput = inUi({
  ...boxBase,
  position: "absolute",
  opacity: 0,
  zIndex: -1,
  width: "1px",
  height: "1px",
  overflow: "hidden"
});

export const radioIcon = inUi({
  ...boxBase,
  marginRight: vars.space[2],
  borderRadius: vars.radius.round,
  color: "gray",
  flexShrink: 0,
  selectors: {
    [`${radioInput}:checked ~ &`]: { color: vars.color.primary }
  }
});

export const radioChecked = inUi({
  display: "none",
  selectors: { [`${radioInput}:checked ~ &`]: { display: "block" } }
});

export const radioUnchecked = inUi({
  display: "block",
  selectors: { [`${radioInput}:checked ~ &`]: { display: "none" } }
});

export const menuButton = inUi({
  ...boxBase,
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.space[1],
  width: "32px",
  height: "32px",
  color: "inherit",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: vars.radius.control
});

export const menuIcon = inUi({ ...boxBase, display: "block" });

// The old theme's `links` variants, plus `.active` (bold and underlined) from InternalLink.
export const link = recipe({
  base: {
    "@layer": {
      [ui]: {
        selectors: {
          "&.active": {
            fontWeight: vars.fontWeight.bold,
            textDecoration: "underline"
          }
        }
      }
    }
  },
  variants: {
    variant: {
      default: { "@layer": { [ui]: { color: vars.color.link } } },
      menu: { "@layer": { [ui]: { color: vars.color.white } } },
      tag: {
        "@layer": { [ui]: { color: vars.color.white, textDecoration: "none" } }
      },
      footer: { "@layer": { [ui]: { color: vars.color.veryLight } } },
      paginator: {
        "@layer": {
          [ui]: {
            paddingTop: vars.space[1],
            paddingBottom: vars.space[1],
            paddingLeft: vars.space[2],
            paddingRight: vars.space[2],
            borderRadius: vars.radius[1],
            backgroundColor: vars.color.primary,
            color: vars.color.white,
            marginLeft: vars.space[1],
            marginRight: vars.space[1],
            marginBottom: vars.space[2],
            display: "inline-block",
            textDecoration: "none"
          }
        }
      }
    }
  },
  defaultVariants: { variant: "default" }
});

export type LinkVariant = NonNullable<
  NonNullable<Parameters<typeof link>[0]>["variant"]
>;
