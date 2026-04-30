import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { themeContract } from "@/styles/theme.css";

/**
 * Replicates the legacy theme-ui `buttons` variants.
 */
export const button = recipe({
  base: {
    appearance: "none",
    fontFamily: "inherit",
    fontSize: themeContract.fontSizes["2"],
    fontWeight: themeContract.fontWeights.bold,
    lineHeight: themeContract.lineHeights.body,
    padding: `${themeContract.space["2"]} ${themeContract.space["3"]}`,
    border: 0,
    borderRadius: themeContract.radii["2"],
    cursor: "pointer",
    color: themeContract.colors.background
  },
  variants: {
    variant: {
      primary: {
        background: themeContract.colors.primary,
        selectors: {
          "&:hover": { background: themeContract.colors.primaryDark },
          "&:disabled": {
            background: themeContract.colors.disabled,
            cursor: "not-allowed"
          }
        }
      },
      secondary: {
        background: themeContract.colors.secondary
      }
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

export type ButtonVariants = RecipeVariants<typeof button>;
