/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { DateTime } from "luxon";
import { FC, memo } from "react";

import Markdown from "./Markdown";

type Props = {
  entry: {
    date: string;
    author: string;
    scribbling: {
      scribbling: string;
    };
    reply?: {
      reply: string;
    };
  };
};

const GuestbookEntry: FC<Props> = ({ entry }) => {
  const date = DateTime.fromISO(entry.date)
    .setLocale("fi")
    .setZone("Europe/Helsinki");

  return (
    <Box mt={2} mb={4}>
      <Box>
        <Box
          mb={1}
          sx={{
            fontWeight: "bold"
          }}
        >
          {entry.author},{" "}
          <time dateTime={date.toISO()}>
            {date.toLocaleString({ locale: "fi" })}
          </time>
        </Box>
        <Markdown>{entry.scribbling.scribbling}</Markdown>
      </Box>

      {entry.reply && (
        <Box
          mt={2}
          mb={2}
          sx={{
            fontStyle: "italic"
          }}
        >
          <Markdown>{entry.reply.reply}</Markdown>
        </Box>
      )}
    </Box>
  );
};

export default memo(GuestbookEntry);
