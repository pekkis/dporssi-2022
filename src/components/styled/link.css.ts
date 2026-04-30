import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { themeContract } from "@/styles/theme.css";

/**
 * Replicates the legacy theme-ui `links.*` variants.
 */
export const link = recipe({
  base: {
    selectors: {
      "&.active": {
        fontWeight: themeContract.fontWeights.bold,
        textDecoration: "underline"
      }
    }
  },
  variants: {
    variant: {
      default: {
        color: themeContract.colors.link
      },
      menu: {
        color: themeContract.colors.white
      },
      tag: {
        color: themeContract.colors.white,
        textDecoration: "none"
      },
      footer: {
        color: themeContract.colors.veryLight
      },
      paginator: {
        paddingTop: themeContract.space["1"],
        paddingBottom: themeContract.space["1"],
        paddingLeft: themeContract.space["2"],
        paddingRight: themeContract.space["2"],
        borderRadius: themeContract.radii["1"],
        backgroundColor: themeContract.colors.primary,
        color: themeContract.colors.white,
        marginLeft: themeContract.space["1"],
        marginRight: themeContract.space["1"],
        marginBottom: themeContract.space["2"],
        display: "inline-block",
        textDecoration: "none"
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type LinkVariants = RecipeVariants<typeof link>;

export type LinkVariant = NonNullable<NonNullable<LinkVariants>["variant"]>;
