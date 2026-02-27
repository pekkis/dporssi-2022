import { FaExternalLinkAlt } from "react-icons/fa";
import { FC, ReactNode } from "react";

type Props = {
  to: string;
  variant?: string;
  icon?: boolean;
  rel?: string;
  "aria-label"?: string;
  children: ReactNode;
};

const ExternalLink: FC<Props> = ({
  to,
  children,
  icon = true,
  variant,
  ...rest
}) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={to}
    className="whitespace-nowrap [&.active]:font-bold"
    {...rest}
  >
    {children}
    {icon && (
      <FaExternalLinkAlt
        className="align-middle ml-1 inline"
        aria-hidden="true"
      />
    )}
  </a>
);

export default ExternalLink;
