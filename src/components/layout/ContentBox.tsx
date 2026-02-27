import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ContentBox: FC<Props> = ({ children }) => {
  return <div className="mx-4">{children}</div>;
};

export default ContentBox;
