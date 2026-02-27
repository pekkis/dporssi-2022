import { FC, memo, useState } from "react";
import { GuestBookEntry } from "@/types";
import axios from "axios";
import { UserInterface } from "@/services/state";

type Props = {
  entry: GuestBookEntry;
  user: UserInterface;
};

const GuestbookEntry: FC<Props> = ({ entry, user }) => {
  const [reply, setReply] = useState<string | undefined>();

  return (
    <div className="my-4">
      <textarea
        className="border border-muted rounded p-2 w-full mb-2"
        onChange={(e) => {
          setReply(e.currentTarget.value);
        }}
      />
      <button
        className="bg-primary text-white rounded px-4 py-2 cursor-pointer"
        onClick={() => {
          axios.put(`${process.env.NEXT_PUBLIC_API}/api/guestbook`, {
            id: entry.id,
            reply,
            token: user?.token
          });
        }}
      >
        Vastaa
      </button>
    </div>
  );
};

export default memo(GuestbookEntry);
