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
    <article className="mt-2 mb-8">
      <header>
        <h2 className="text-2xl font-bold mb-0">
          <InternalLink to={link}>{propaganda.title}</InternalLink>
        </h2>
        <div className="mt-1">
          Julkaistu{" "}
          <time dateTime={date.toISODate() ?? undefined}>
            {date.toLocaleString()}
          </time>
        </div>
      </header>
      <main className="my-2">
        <Markdown>{propaganda.description}</Markdown>
        <div className="my-2">
          <FaAngleDoubleRight className="mr-1 inline" />
          <InternalLink to={link}>Lue lisää</InternalLink>
        </div>
      </main>
    </article>
  );
};

export default PropagandaLight;
