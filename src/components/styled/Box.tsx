import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  forwardRef,
  ReactNode,
  Ref
} from "react";
import { sprinkles, Sprinkles } from "@/styles/sprinkles.css";
import { cx } from "@/styles/cx";

/**
 * A minimal `Box` primitive replacing theme-ui's `Box`. It accepts the
 * sprinkles props (m, p, color, bg, display, ...) plus an `as` prop for
 * the rendered element. Extra one-off styles can come through `style`
 * (inline) or `className` (vanilla-extract `style()` calls). There is no
 * `sx` prop — that's the point of the migration.
 */

type BoxOwnProps = Sprinkles & {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type BoxProps<T extends ElementType = "div"> = BoxOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "color" | keyof BoxOwnProps>;

const sprinkleKeys = new Set<string>([
  "display",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "alignSelf",
  "alignContent",
  "textAlign",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "gap",
  "rowGap",
  "columnGap",
  "fontSize",
  "width",
  "maxWidth",
  "minWidth",
  "height",
  "maxHeight",
  "minHeight",
  "m",
  "mt",
  "mb",
  "ml",
  "mr",
  "mx",
  "my",
  "p",
  "pt",
  "pb",
  "pl",
  "pr",
  "px",
  "py",
  "color",
  "background",
  "backgroundColor",
  "bg",
  "borderColor",
  "borderRadius",
  "borderWidth",
  "borderStyle",
  "fontWeight",
  "textDecoration",
  "textTransform",
  "cursor",
  "overflow",
  "overflowX",
  "overflowY",
  "whiteSpace",
  "position",
  "zIndex",
  "listStyleType",
  "verticalAlign"
]);

const splitProps = (props: Record<string, unknown>) => {
  const sprinkleProps: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};
  for (const key in props) {
    if (sprinkleKeys.has(key)) {
      sprinkleProps[key] = props[key];
    } else {
      rest[key] = props[key];
    }
  }
  return { sprinkleProps, rest };
};

const BoxImpl = forwardRef<HTMLElement, BoxProps<ElementType>>(function Box(
  props,
  ref
) {
  const { as: Component = "div", className, ...rest } = props;
  const { sprinkleProps, rest: htmlProps } = splitProps(
    rest as Record<string, unknown>
  );
  const sprinkleClass = sprinkles(sprinkleProps as Sprinkles);
  return (
    <Component
      ref={ref}
      className={cx(sprinkleClass, className)}
      {...htmlProps}
    />
  );
});

// Re-typed export so the `as` prop infers the right HTML element props.
export const Box = BoxImpl as <T extends ElementType = "div">(
  props: BoxProps<T> & { ref?: Ref<unknown> }
) => React.ReactElement | null;
