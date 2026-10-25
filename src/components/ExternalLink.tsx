import { FaExternalLinkAlt } from "react-icons/fa";
import { FC, ReactNode } from "react";
import * as styles from "./ExternalLink.css";

type Props = {
  to: string;
  icon?: boolean;
  rel?: string;
  children: ReactNode;
};

const ExternalLink: FC<Props> = ({ to, children, icon = true, ...rest }) => (
  <a
    target="_blank"
    rel="noreferrer"
    href={to}
    className={styles.anchor}
    {...rest}
  >
    {children}
    {icon && (
      <FaExternalLinkAlt className={styles.icon} alignmentBaseline="middle" />
    )}
  </a>
);

export default ExternalLink;
