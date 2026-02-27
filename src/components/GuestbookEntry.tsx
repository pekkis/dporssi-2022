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
    <div className="mt-2 mb-8">
      <div>
        <div className="mb-1 font-bold">
          {entry.author},{" "}
          <time dateTime={date.toISO()}>{date.toLocaleString()}</time>
        </div>
        <Markdown>{entry.scribbling}</Markdown>
      </div>

      {entry.reply && (
        <div className="mt-2 mb-2 italic">
          <Markdown>{entry.reply}</Markdown>
        </div>
      )}

      {!entry.reply && user.data?.numberOfVotes === 1000 && (
        <GuestbookReplyer entry={entry} user={user} />
      )}
    </div>
  );
};

export default memo(GuestbookEntry);
