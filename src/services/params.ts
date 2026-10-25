import type { ParsedUrlQuery } from "querystring";

/** A route parameter as a single string, or undefined when it is missing or repeated. */
export const stringParam = (
  params: ParsedUrlQuery | undefined,
  name: string
): string | undefined => {
  const value = params?.[name];
  return typeof value === "string" ? value : undefined;
};

/** The 1-based page number from the route, or undefined unless it is a positive integer. */
export const pageParam = (
  params: ParsedUrlQuery | undefined
): number | undefined => {
  const value = stringParam(params, "page");
  return value && /^[1-9]\d*$/.test(value) ? Number(value) : undefined;
};
