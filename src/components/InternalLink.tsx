"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, MouseEventHandler, ReactNode } from "react";
import { cx, link, type LinkVariant } from "@/components/ui";

type Props = {
  title?: string;
  variant?: LinkVariant;
  to: string;
  children: ReactNode;
  className?: string;
  /**
   * When the link counts as the current page (it gets the `active` class): "exact" when
   * the path is `to`, "prefix" when it starts with `to`. Plain data, not a function, so
   * server components can pass it.
   */
  match?: "exact" | "prefix";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const InternalLink: FC<Props> = ({
  to,
  variant = "default",
  match,
  className,
  ...rest
}) => {
  const pathname = usePathname() ?? "";
  const isActive =
    match === "exact"
      ? pathname === to
      : match === "prefix"
        ? pathname.startsWith(to)
        : false;

  return (
    <Link
      href={to}
      {...rest}
      className={cx(link({ variant }), isActive && "active", className)}
    />
  );
};

export default InternalLink;
