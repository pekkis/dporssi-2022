/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { FC, memo } from "react";
import { Box } from "theme-ui";
import { range } from "ramda";
import InternalLink from "./InternalLink";
import { Locale } from "../services/url";
import { url } from "../services/url";

type Props = {
  id?: string;
  usePreviousAndNext?: boolean;
  label: string;
  currentPage: number;
  numPages: number;
  getLink: "newsIndex" | "dictatorIndex" | "guestbookIndex";
};

const Previous = ({ currentPage, numPages, getLink }) => {
  if (currentPage === 1) {
    return null;
  }

  return (
    <InternalLink to={getLink(currentPage - 1)}>
      <span>Edellinen</span>
    </InternalLink>
  );
};
const Next = ({ currentPage, numPages, getLink }) => {
  return <span>Seuraava</span>;
};

const Paginator: FC<Props> = ({
  id = "paginator",
  label = "sivutus",
  currentPage,
  numPages,
  getLink,
  usePreviousAndNext = false,
}) => {
  return (
    <Box
      id={id}
      aria-label={label}
      as="nav"
      sx={{
        textAlign: "center",
      }}
    >
      {usePreviousAndNext && (
        <Previous
          currentPage={currentPage}
          numPages={numPages}
          getLink={getLink}
        />
      )}
      {range(1, numPages + 1).map((r) => {
        return (
          <InternalLink
            key={r}
            variant="links.paginator"
            to={url<Props["getLink"]>(
              getLink,
              process.env.NEXT_PUBLIC_LOCALE as Locale
            )(r)}
          >
            {r}
          </InternalLink>
        );
      })}
      {usePreviousAndNext && (
        <Next currentPage={currentPage} numPages={numPages} getLink={getLink} />
      )}
    </Box>
  );
};

export default memo(Paginator);
