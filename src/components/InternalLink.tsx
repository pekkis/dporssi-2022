import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { FC, MouseEventHandler, ReactNode } from "react";
import { cx, link, type LinkVariant } from "@/components/ui";

type Props = {
  title?: string;
  variant?: LinkVariant;
  to: string;
  children: ReactNode;
  isActive?: (router: NextRouter) => boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const InternalLink: FC<Props> = ({
  to,
  variant = "default",
  isActive = () => false,
  ...rest
}) => {
  const router = useRouter();

  return (
    <Link
      href={to}
      {...rest}
      className={cx(link({ variant }), isActive(router) && "active")}
    />
  );
};

export default InternalLink;
