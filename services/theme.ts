import { funk } from "@theme-ui/presets";
import { darken } from "@theme-ui/color";

export const breakpoints = [768, 992];

const theme = {
  ...funk,

  lineHeights: {
    ...funk.lineHeights,
    body: 1.4,
  },

  colors: {
    ...funk.colors,
    primary: "#de0000",
    muted: "#ccc",
    black: "#000",
    disabled: "rgb(99, 99, 99)",
    link: "rgb(12, 12, 12)",
    superLight: "rgb(245, 245, 245)",
    extraLight: "rgb(235, 235, 235)",
    veryLight: "rgb(230, 230, 230)",
    light: "rgb(200, 200, 200)",
    notSoLight: "rgb(175, 175, 175)",
    veryDark: "rgb(12, 12, 12)",
  },

  borderWidths: [0, 1, 2, 4, 8],

  sizes: {
    ...funk.sizes,
    container: "1200px",
  },

  buttons: {
    ...funk.buttons,
    primary: {
      color: "background",
      cursor: "pointer",
      bg: "primary",
      "&:hover": {
        bg: () => darken("primary", 0.05),
      },
      "&:disabled": {
        bg: "disabled",
        cursor: "not-allowed",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },

  borders: ["1px", "2px", "4px"],

  radii: [0, "2px", "4px", "500%"],

  breakpoints: breakpoints.map((b) => `${b}px`),
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],

  fontWeights: {
    body: 400,
    heading: 700,
    normal: 400,
    bold: 700,
  },

  zIndices: [-10, 0, 10, 100, 1000, 10000, 100000],

  fonts: {
    ...funk.fonts,
    body: "din-2014, sans-serif",
    heading: "din-2014, sans-serif",
  },
  styles: {
    ...funk.styles,
    root: {
      // uses the theme values provided above
      fontFamily: "body",
      fontWeight: "body",
      fontSize: 2,
      p: {
        my: 3,
        ":first-of-type": {
          mt: 0,
        },
        ":last-of-type": {
          mb: 0,
        },
      },
    },
    a: {
      color: "link",
    },
  },

  links: {
    paginator: {
      paddingY: 1,
      paddingX: 2,
      borderRadius: 1,
      backgroundColor: "primary",
      color: "white",
      marginX: 1,
      marginBottom: 2,
      display: "inline-block",
      textDecoration: "none",
    },

    default: {
      color: "link",
    },
    menu: {
      color: "white",
    },
    tag: {
      color: "white",
      textDecoration: "none",
    },
    footer: {
      color: "veryLight",
    },
  },

  text: {
    paragraph: {
      marginTop: 3,
      marginBottom: 3,
    },
  },

  forms: {
    ...funk.forms,
    label: {
      fontSize: 1,
      fontWeight: "bold",
    },
    input: {
      mb: 3,
    },
    textarea: {
      mb: 3,
    },
  },
};

export default theme;
