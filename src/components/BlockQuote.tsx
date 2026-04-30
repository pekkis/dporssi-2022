import { blockquote } from "./BlockQuote.css";

const BlockQuote = (props) => {
  const { children } = props;

  return <blockquote className={blockquote}>{children}</blockquote>;
};

export default BlockQuote;
