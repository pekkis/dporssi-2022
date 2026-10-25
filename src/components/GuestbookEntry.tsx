import { Box } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "./GuestbookEntry.css";
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
    <Box className={sprinkles({ mt: 2, mb: 4 })}>
      <Box>
        <Box className={styles.author}>
          {entry.author},{" "}
          <time dateTime={date.toISO() ?? undefined}>
            {date.toLocaleString()}
          </time>
        </Box>
        <Markdown>{entry.scribbling}</Markdown>
      </Box>

      {entry.reply && (
        <Box className={styles.reply}>
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
