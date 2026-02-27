import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { FC, ReactNode } from "react";

const variantClasses: Record<string, string> = {
  "links.paginator":
    "px-2 py-1 rounded-sm bg-primary text-white mx-1 mb-2 inline-block",
  "links.footer": "text-very-light",
  "links.menu": "text-white",
  "links.tag": "text-white",
  "links.default": ""
};

type Props = {
  title?: string;
  variant?: string;
  to: string;
  children: ReactNode;
  isActive?: (router: NextRouter) => boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};

const InternalLink: FC<Props> = ({
  to,
  variant = "links.default",
  isActive = () => false,
  className,
  ...rest
}) => {
  const router = useRouter();

  const isLinkActive = isActive(router);

  const variantClass = variantClasses[variant] || "";

  return (
    <Link
      href={to}
      {...rest}
      className={
        [variantClass, isLinkActive ? "font-bold underline active" : "", className]
          .filter(Boolean)
          .join(" ") || undefined
      }
    />
  );
};

export default InternalLink;
