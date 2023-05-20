/** @jsxImportSource theme-ui */
import { Box, Input, jsx, Textarea } from "theme-ui";
import { DateTime } from "luxon";
import { FC, memo } from "react";

import Markdown from "./Markdown";
import { GuestBookEntry } from "@/types";
import { createDate } from "@/services/date";
import { UserInterface } from "@/services/state";
import GuestbookReplyer from "./GuestbookReplyer";

type Props = {
  entry: GuestBookEntry;
  user: UserInterface;
};

const GuestbookEntry: FC<Props> = ({ entry, user }) => {
  const date = createDate(entry.date);

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
          <time dateTime={date.toISO()}>{date.toLocaleString()}</time>
        </Box>
        <Markdown>{entry.scribbling}</Markdown>
      </Box>

      {entry.reply && (
        <Box
          mt={2}
          mb={2}
          sx={{
            fontStyle: "italic"
          }}
        >
          <Markdown>{entry.reply}</Markdown>
        </Box>
      )}

      {!entry.reply && user.data?.numberOfVotes === 1000 && (
        <GuestbookReplyer entry={entry} user={user} />
      )}
    </Box>
  );
};

export default memo(GuestbookEntry);
