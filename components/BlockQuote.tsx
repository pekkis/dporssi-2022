/** @jsx jsx */
import { jsx } from "theme-ui";

const BlockQuote = (props) => {
  const { children } = props;

  return (
    <blockquote
      sx={{
        fontStyle: "italic",
        borderRadius: 1,
        backgroundColor: "superLight",
        borderLeftColor: "veryLight",
        borderLeftStyle: "solid",
        borderLeftWidth: 4,
        my: 3,
        mx: 0,
        p: 3,

        ":before": {
          color: "light",
          content: "open-quote",
          fontSize: 7,
          lineHeight: "0",
          marginRight: 3,
          verticalAlign: "-0.4em"
        }
      }}
    >
      {children}
    </blockquote>
  );

  /*
  blockquote:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }*/
};

export default BlockQuote;
