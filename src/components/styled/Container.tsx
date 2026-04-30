import { ReactNode } from "react";
import { container } from "./Container.css";
import { cx } from "@/styles/cx";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return <div className={cx(container, className)}>{children}</div>;
};
