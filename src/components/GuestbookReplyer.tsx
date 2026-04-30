import { Box } from "@/components/styled/Box";
import { Button } from "@/components/styled/Button";
import { Textarea } from "@/components/styled/form";
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
    <Box my="3">
      <Textarea
        onChange={(e) => {
          setReply(e.currentTarget.value);
        }}
      />
      <Button
        onClick={() => {
          axios.put(`${process.env.NEXT_PUBLIC_API}/api/guestbook`, {
            id: entry.id,
            reply,
            token: user?.token
          });
        }}
      >
        Vastaa
      </Button>
    </Box>
  );
};

export default memo(GuestbookEntry);
