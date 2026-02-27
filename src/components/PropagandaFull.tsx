import Markdown from "./Markdown";
import ContentfulImage from "./contentful/ContentfulImage";
import NextImage from "next/image";
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
    <article className="propaganda-full">
      <header style={{ gridArea: "header" }}>
        <h2 className="text-2xl font-bold mb-0">{propaganda.title}</h2>
        <div className="mt-1">
          Julkaistu{" "}
          <time dateTime={date.toISODate() ?? undefined}>
            {date.toLocaleString()}
          </time>
        </div>

        <div className="mt-4 italic">
          <Markdown>{propaganda.description}</Markdown>
        </div>
      </header>

      <div style={{ gridArea: "sidebar", alignSelf: "start" }}>
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
            alt=""
          />
        )}
      </div>

      <section style={{ gridArea: "main" }}>
        <Markdown>{propaganda.article}</Markdown>
      </section>
    </article>
  );
};

export default PropagandaFull;
