import type { ComponentPropsWithRef, ElementType } from "react";
import * as s from "./ui.css";

// Plain components with Vanilla Extract classes, replacing theme-ui's. Only base styles
// live here; each use site adds its own class through `className`.

export const cx = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

type Polymorphic<T extends ElementType> = { as?: T } & Omit<
  ComponentPropsWithRef<T>,
  "as"
>;

export const Box = <T extends ElementType = "div">({
  as,
  className,
  ...rest
}: Polymorphic<T>) => {
  const Component: ElementType = as ?? "div";
  return <Component className={cx(s.box, className)} {...rest} />;
};

export const Flex = <T extends ElementType = "div">({
  as,
  className,
  ...rest
}: Polymorphic<T>) => {
  const Component: ElementType = as ?? "div";
  return <Component className={cx(s.flex, className)} {...rest} />;
};

export const Heading = <T extends ElementType = "h2">({
  as,
  className,
  ...rest
}: Polymorphic<T>) => {
  const Component: ElementType = as ?? "h2";
  return <Component className={cx(s.heading, className)} {...rest} />;
};

export const Paragraph = ({
  className,
  ...rest
}: ComponentPropsWithRef<"p">) => (
  <p className={cx(s.paragraph, className)} {...rest} />
);

export const Container = <T extends ElementType = "div">({
  as,
  className,
  ...rest
}: Polymorphic<T>) => {
  const Component: ElementType = as ?? "div";
  return <Component className={cx(s.container, className)} {...rest} />;
};

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary";
};

export const Button = ({ variant, className, ...rest }: ButtonProps) => (
  <button className={cx(s.button({ variant }), className)} {...rest} />
);

export const Input = ({
  className,
  ...rest
}: ComponentPropsWithRef<"input">) => (
  <input className={cx(s.input, className)} {...rest} />
);

export const Textarea = ({
  className,
  ...rest
}: ComponentPropsWithRef<"textarea">) => (
  <textarea className={cx(s.textarea, className)} {...rest} />
);

export const Label = ({
  className,
  ...rest
}: ComponentPropsWithRef<"label">) => (
  // A primitive: the use site associates it (htmlFor or a wrapped control).
  // oxlint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={cx(s.label, className)} {...rest} />
);

const RadioChecked = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentcolor"
    aria-hidden="true"
    className={cx(s.radioIcon, s.radioChecked, className)}
  >
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);

const RadioUnchecked = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentcolor"
    aria-hidden="true"
    className={cx(s.radioIcon, s.radioUnchecked, className)}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);

// A visually hidden native radio and theme-ui's two SVG icons, shown by the input's state.
export const Radio = ({
  className,
  ...rest
}: Omit<ComponentPropsWithRef<"input">, "type">) => (
  <div className={s.radio}>
    <input type="radio" className={s.radioInput} {...rest} />
    <RadioChecked className={className} />
    <RadioUnchecked className={className} />
  </div>
);

export const MenuButton = ({
  className,
  ...rest
}: ComponentPropsWithRef<"button">) => (
  <button
    type="button"
    title="Menu"
    aria-label="Toggle Menu"
    className={cx(s.menuButton, className)}
    {...rest}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      className={s.menuIcon}
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </button>
);

export { link, type LinkVariant } from "./ui.css";
