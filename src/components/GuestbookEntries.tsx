"use client";

import { useUserStore } from "@/services/state";
import type { GuestBookEntry } from "@/types";
import GuestbookEntry from "./GuestbookEntry";

// The entries need the signed-in user (the chairman gets a reply box).
const GuestbookEntries = ({ posts }: { posts: GuestBookEntry[] }) => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {posts.map((entry) => (
        <GuestbookEntry user={user} key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default GuestbookEntries;
