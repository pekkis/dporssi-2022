/** @jsxImportSource theme-ui */
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { FC, ReactNode } from "react";
// import { LinkGetProps } from "@reach/router";

type Props = {
  title?: string;
  variant?: string;
  to: string;
  partiallyActive?: boolean;
  children: ReactNode;
  isActive?: (router: NextRouter) => boolean;
};

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "active" } : {};
};

const isPartiallyActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent ? { className: "active" } : {};
};

/*
      partiallyActive={partiallyActive}
      activeClassName="active"
*/

const InternalLink: FC<Props> = ({
  to,
  variant = "links.default",
  partiallyActive = false,
  isActive = () => false,
  ...rest
}) => {
  const router = useRouter();

  const isLinkActive = isActive(router);

  return (
    <Link href={to}>
      <a
        {...rest}
        href={to}
        className={isLinkActive && "active"}
        sx={{
          variant,
          "&.active": {
            fontWeight: "bold",
            textDecoration: "underline",
          },
        }}
      />
    </Link>
  );
};

export default InternalLink;
