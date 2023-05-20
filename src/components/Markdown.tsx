import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { components } from "@/services/markdown";

type Props = {
  children: string;
};

const Markdown: FC<Props> = (props) => {
  const { children } = props;
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
};

export default Markdown;
