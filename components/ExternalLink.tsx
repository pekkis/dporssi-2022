/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FC } from "react";

type Props = {
  to: string;
  variant?: string;
  icon?: boolean;
  rel?: string;
};

const ExternalLink: FC<Props> = ({
  to,
  children,
  icon = true,
  variant = "links.default",
  ...rest
}) => (
  <a
    target="_blank"
    href={to}
    sx={{
      color: "inherit",
      "&.active": {
        fontWeight: "bold",
      },
      whiteSpace: "nowrap",
    }}
    {...rest}
  >
    {children}
    {icon && (
      <FaExternalLinkAlt
        sx={{
          verticalAlign: "middle",
          ml: 1,
        }}
        alignmentBaseline="middle"
      />
    )}
  </a>
);

export default ExternalLink;
