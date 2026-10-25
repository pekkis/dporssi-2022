import { Box, Heading } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "./PropagandaLight.css";
import { Locale, url } from "@/services/url";
import InternalLink from "./InternalLink";
import Markdown from "./Markdown";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FakeNewsItem } from "@/types";
import { createDate } from "@/services/date";

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
    <Box className={sprinkles({ mt: 2, mb: 4 })} as="article">
      <Box as="header">
        <Heading className={sprinkles({ mb: 0 })} as="h2">
          <InternalLink to={link}>{propaganda.title}</InternalLink>
        </Heading>
        <Box className={sprinkles({ mt: 1 })}>
          Julkaistu{" "}
          <time dateTime={date.toISODate()}>{date.toLocaleString()}</time>
        </Box>
      </Box>
      <Box as="main" className={sprinkles({ my: 2 })}>
        <Markdown>{propaganda.description}</Markdown>
        <Box className={sprinkles({ my: 2 })}>
          <FaAngleDoubleRight className={styles.icon} />
          <InternalLink to={link}>Lue lisää</InternalLink>
        </Box>
      </Box>
    </Box>
  );
};

export default PropagandaLight;
