import { FC, memo } from "react";
import { Box } from "@/components/ui";
import * as styles from "./Paginator.css";
import { range } from "ramda";
import InternalLink from "./InternalLink";
import { Locale } from "@/services/url";
import { url } from "@/services/url";

type Props = {
  id?: string;
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
  getLink
}) => {
  return (
    <Box id={id} aria-label={label} as="nav" className={styles.paginator}>
      {range(1, numPages + 1).map((r) => {
        const to = url<Props["getLink"]>(
          getLink,
          process.env.NEXT_PUBLIC_LOCALE as Locale
        )(r);

        return (
          <InternalLink
            key={r}
            variant="paginator"
            to={to}
            isActive={(router) => {
              return router.asPath === to;
            }}
          >
            {r}
          </InternalLink>
        );
      })}
    </Box>
  );
};

export default memo(Paginator);
