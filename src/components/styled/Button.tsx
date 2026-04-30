import { ComponentPropsWithoutRef, forwardRef } from "react";
import { button, ButtonVariants } from "./Button.css";
import { cx } from "@/styles/cx";

type Props = ComponentPropsWithoutRef<"button"> & ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant, type = "button", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(button({ variant }), className)}
      {...rest}
    />
  );
});
