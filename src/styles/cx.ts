/**
 * Tiny classnames helper. Filters falsy values, joins with a space.
 * Avoids pulling in a dependency just for this.
 */
export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");
