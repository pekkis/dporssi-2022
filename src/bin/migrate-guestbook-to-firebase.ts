import * as contentful from "contentful-management";
import util from "util";
import TurndownService from "turndown";
import { v4 } from "uuid";
import { getFirestore } from "../services/firebase-admin";
import { reverse, sortBy } from "ramda";

import dotenv from "dotenv";
dotenv.config({
  path: ".env.local"
});

const turndownService = new TurndownService();

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ADMIN_ACCESS_TOKEN
});

const transformer = (old) => {
  return {
    id: v4(),
    author: old.fields?.author?.fi,
    date: old.fields.date.fi,
    scribbling: old.fields?.scribbling?.fi,
    reply: old.fields?.reply?.fi
  };
};

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");

  const firestore = getFirestore();
  firestore.settings({ ignoreUndefinedProperties: true });

  let skip = 0;
  let limit = 100;
  let reversed = [];

  let totalPosts = 0;

  do {
    const guestbook = await environment.getEntries({
      content_type: "guestbook",
      limit,
      skip
    });

    const migrated = guestbook.items.map(transformer);

    const ordered = sortBy((e) => e.date, migrated);

    reversed = reverse(ordered);

    for await (const entry of reversed) {
      console.log(util.inspect(entry, false, 666), "tags");
      await firestore.collection("guestbook").doc(entry.id).set(entry);

      totalPosts = totalPosts + 1;
    }

    console.log("PROCESSORE", skip, limit);

    skip = skip + 100;
  } while (reversed.length > 0);

  await firestore.collection("guestbook").doc("---stats---").set({
    totalPosts
  });
};

run();
