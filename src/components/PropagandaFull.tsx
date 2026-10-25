import { Box, Heading } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "./PropagandaFull.css";
import Markdown from "./Markdown";
import NextImage from "next/image";
import ContentfulImage from "./contentful/ContentfulImage";
import { FakeNewsItem, StaticImageData } from "@/types";
import { createDate } from "@/services/date";

type Props = {
  propaganda: FakeNewsItem;
  defaultImage: StaticImageData;
};

const PropagandaFull = (props: Props) => {
  const { propaganda, defaultImage } = props;

  const date = createDate(propaganda.date);

  return (
    <Box as="article" className={styles.article}>
      <Box as="header" className={styles.header}>
        <Heading className={sprinkles({ mb: 0 })} as="h2">
          {propaganda.title}
        </Heading>
        <Box className={sprinkles({ mt: 1 })}>
          Julkaistu{" "}
          <time dateTime={date.toISODate()}>{date.toLocaleString()}</time>
        </Box>

        <Box className={styles.description}>
          <Markdown>{propaganda.description}</Markdown>
        </Box>
      </Box>

      <Box className={styles.sidebar}>
        {propaganda.image ? (
          <ContentfulImage
            data={propaganda.image}
            alt={propaganda.image.title}
          />
        ) : (
          <NextImage
            src={defaultImage.src}
            width={defaultImage.width}
            height={defaultImage.height}
          />
        )}
        {/*
            <GatsbyImage
              alt={propaganda.image ? propaganda.image.title : "kuvituskuva"}
              image={
                propaganda.image
                  ? propaganda.image.gatsbyImageData
                  : defaultImage.childImageSharp.gatsbyImageData
              }
            />
            */}
      </Box>

      <Box as="section" className={styles.main}>
        <Markdown>{propaganda.article}</Markdown>
      </Box>
    </Box>
  );
};

export default PropagandaFull;
