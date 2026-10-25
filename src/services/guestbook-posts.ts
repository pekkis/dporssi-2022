import "server-only";
import { getFirestore } from "@/services/firebase-admin";
import type { GuestBookEntry } from "@/types";

export type GuestbookPage = {
  totalPosts: number;
  posts: GuestBookEntry[];
};

/** A page of guestbook posts, newest first, straight from Firestore. */
export const getGuestbookPosts = async (
  offset: number,
  limit: number
): Promise<GuestbookPage> => {
  const store = getFirestore();

  const docs = await store
    .collection("guestbook")
    .orderBy("date", "desc")
    .offset(offset)
    .limit(limit)
    .get();

  const stat = await store.collection("guestbook").doc("---stats---").get();

  return {
    totalPosts: stat.data()?.totalPosts ?? 0,
    posts: docs.docs.map((d) => d.data() as GuestBookEntry)
  };
};
