import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC } from "react";
import { link, LinkVariant } from "@/components/styled/link.css";
import { cx } from "@/styles/cx";

type Props = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "className"
> & {
  to: string;
  variant?: LinkVariant;
  className?: string;
  isActive?: (router: NextRouter) => boolean;
};

const InternalLink: FC<Props> = ({
  to,
  variant = "default",
  isActive = () => false,
  className,
  ...rest
}) => {
  const router = useRouter();

  const isLinkActive = isActive(router);

  return (
    <Link
      href={to}
      {...rest}
      className={cx(link({ variant }), className, isLinkActive && "active")}
    />
  );
};

export default InternalLink;
