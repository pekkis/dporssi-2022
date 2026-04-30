import { Box } from "@/components/styled/Box";
import { Heading } from "@/components/styled/Heading";
import Markdown from "./Markdown";
import NextImage from "next/image";
import ContentfulImage from "./contentful/ContentfulImage";
import { FakeNewsItem, StaticImageData } from "@/types";
import { createDate } from "@/services/date";
import {
  fullArticle,
  headerArea,
  italic,
  mainArea,
  sidebarArea
} from "./PropagandaFull.css";

type Props = {
  propaganda: FakeNewsItem;
  defaultImage: StaticImageData;
};

const PropagandaFull = (props: Props) => {
  const { propaganda, defaultImage } = props;

  const date = createDate(propaganda.date);

  return (
    <article className={fullArticle}>
      <header className={headerArea}>
        <Heading mb="0" as="h2">
          {propaganda.title}
        </Heading>
        <Box mt="1">
          Julkaistu{" "}
          <time dateTime={date.toISODate()}>{date.toLocaleString()}</time>
        </Box>

        <Box mt="3" className={italic}>
          <Markdown>{propaganda.description}</Markdown>
        </Box>
      </header>

      <div className={sidebarArea}>
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
      </div>

      <section className={mainArea}>
        <Markdown>{propaganda.article}</Markdown>
      </section>
    </article>
  );
};

export default PropagandaFull;
