/** @jsxImportSource theme-ui */
import Link from "next/link";
import { FC } from "react";
// import { LinkGetProps } from "@reach/router";

type Props = {
  title?: string;
  variant?: string;
  to: string;
  partiallyActive?: boolean;
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
  ...rest
}) => {
  return (
    <Link href={to}>
      <a
        {...rest}
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
