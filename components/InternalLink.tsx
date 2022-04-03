/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { FC } from "react";
import { LinkGetProps } from "@reach/router";

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

const InternalLink: FC<Props> = ({
  variant = "links.default",
  partiallyActive = false,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      partiallyActive={partiallyActive}
      activeClassName="active"
      sx={{
        variant,
        "&.active": {
          fontWeight: "bold",
          textDecoration: "underline"
        }
      }}
    />
  );
};

export default InternalLink;
