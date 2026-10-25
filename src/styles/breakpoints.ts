// The old theme's breakpoints. theme-ui's responsive arrays `[a, b, c]` meant
// a below 768px, b from 768px, c from 992px.
export const breakpoints = { tablet: 768, desktop: 992 } as const;

export const media = {
  tablet: `screen and (min-width: ${breakpoints.tablet}px)`,
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`
} as const;
