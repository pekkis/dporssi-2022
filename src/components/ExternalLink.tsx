import { FaExternalLinkAlt } from "react-icons/fa";
import { FC, ReactNode } from "react";
import { externalLink, externalLinkIcon } from "./ExternalLink.css";
import { cx } from "@/styles/cx";

type Props = {
  to: string;
  variant?: string;
  icon?: boolean;
  rel?: string;
  className?: string;
  children: ReactNode;
};

const ExternalLink: FC<Props> = ({
  to,
  children,
  icon = true,
  className,
  // `variant` is accepted for API compatibility with the legacy
  // theme-ui ExternalLink — currently no variants exist.
  variant: _variant,
  ...rest
}) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={to}
    className={cx(externalLink, className)}
    {...rest}
  >
    {children}
    {icon && (
      <FaExternalLinkAlt
        className={externalLinkIcon}
        alignmentBaseline="middle"
      />
    )}
  </a>
);

export default ExternalLink;
