/** @jsxImportSource theme-ui */
import { Box, Heading, jsx } from "theme-ui";
import { DateTime } from "luxon";
import { Locale, url } from "../services/url";
import InternalLink from "./InternalLink";
import Markdown from "./Markdown";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FakeNewsItem } from "../types";
import { createDate } from "../services/date";

type Props = {
  propaganda: FakeNewsItem;
};

const PropagandaLight = (props: Props) => {
  const { propaganda } = props;

  const date = createDate(propaganda.date);

  const link = url<"newsItem">(
    "newsItem",
    process.env.NEXT_PUBLIC_LOCALE as Locale
  )(propaganda);

  return (
    <Box mx={2} mt={2} mb={4} as="article">
      <Box as="header">
        <Heading mb={0} as="h2">
          <InternalLink to={link}>{propaganda.title}</InternalLink>
        </Heading>
        <Box mt={1}>
          Julkaistu{" "}
          <time dateTime={date.toISODate()}>{date.toLocaleString()}</time>
        </Box>
      </Box>
      <Box as="main" my={2}>
        <Markdown>{propaganda.description}</Markdown>
        <Box my={2}>
          <FaAngleDoubleRight sx={{ mr: 1 }} />
          <InternalLink to={link}>Lue lisää</InternalLink>
        </Box>
      </Box>
    </Box>
  );
};

export default PropagandaLight;
