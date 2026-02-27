import { FC, memo } from "react";
import { range } from "ramda";
import InternalLink from "./InternalLink";
import { Locale } from "@/services/url";
import { url } from "@/services/url";

type Props = {
  id?: string;
  usePreviousAndNext?: boolean;
  label: string;
  currentPage: number;
  numPages: number;
  getLink: "newsIndex" | "dictatorIndex" | "guestbookIndex";
};

const Paginator: FC<Props> = ({
  id = "paginator",
  label = "sivutus",
  currentPage,
  numPages,
  getLink,
  usePreviousAndNext = false
}) => {
  return (
    <nav id={id} aria-label={label} className="text-center">
      {range(1, numPages + 1).map((r) => {
        const to = url<Props["getLink"]>(
          getLink,
          process.env.NEXT_PUBLIC_LOCALE as Locale
        )(r);

        return (
          <InternalLink
            key={r}
            variant="links.paginator"
            to={to}
            isActive={(router) => {
              return router.asPath === to;
            }}
          >
            {r}
          </InternalLink>
        );
      })}
    </nav>
  );
};

export default memo(Paginator);
