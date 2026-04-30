import {
  ComponentPropsWithoutRef,
  forwardRef,
  LabelHTMLAttributes,
  ReactNode
} from "react";
import { cx } from "@/styles/cx";
import {
  input as inputStyle,
  textarea as textareaStyle,
  label as labelStyle,
  radio as radioStyle,
  menuButton as menuButtonStyle
} from "./form.css";

type InputProps = ComponentPropsWithoutRef<"input">;
type TextareaProps = ComponentPropsWithoutRef<"textarea">;
type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode;
};
type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cx(inputStyle, className)}
      {...rest}
    />
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...rest }, ref) {
    return (
      <textarea ref={ref} className={cx(textareaStyle, className)} {...rest} />
    );
  }
);

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, ...rest },
  ref
) {
  return <label ref={ref} className={cx(labelStyle, className)} {...rest} />;
});

type RadioProps = Omit<InputProps, "type">;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      type="radio"
      className={cx(radioStyle, className)}
      {...rest}
    />
  );
});

/**
 * 24px hamburger icon, the same path the legacy theme-ui MenuButton used.
 */
export const MenuIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    style={{ display: "block" }}
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function MenuButton({ className, "aria-label": ariaLabel, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        title="Menu"
        aria-label={ariaLabel ?? "Toggle Menu"}
        className={cx(menuButtonStyle, className)}
        {...rest}
      >
        <MenuIcon />
      </button>
    );
  }
);
