const contentful = require("contentful-management");
const util = require("util");
const path = require("path");
const axios = require("axios");
const slugify = require("slugify");
const TurndownService = require("turndown");
const fs = require("fs");
const firebase = require("firebase-admin");
const { DateTime } = require("luxon");

const { take, drop, takeLast, indexBy, filter } = require("ramda");

const turndownService = new TurndownService();

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ADMIN_ACCESS_TOKEN
});

const switcheroos = { "mohammed-reza-pahlavi": "mohammad-reza-pahlavi" };

firebase.initializeApp();

firebase.firestore().settings({
  ignoreUndefinedProperties: true
});

const getNumberOfVotes = (user) => {
  if (user.email === "puhemies@diktaattoriporssi.com") {
    return 1000;
  }

  if (user.secretName === "Nabullione") {
    return 100;
  }

  return 1;
};

const fucktorRanking = (ranking, dictators) => {
  if (!ranking) {
    return undefined;
  }

  const newRanking = ranking.ranks
    .map((rm) => {
      return dictators[rm]?.sys.id;
    })
    .filter((r) => r);

  const createdAt =
    ranking.created &&
    DateTime.fromFormat(ranking.created, "yyyy-MM-dd HH:mm:ss");
  const modifiedAt =
    ranking.modified &&
    DateTime.fromFormat(ranking.modified, "yyyy-MM-dd HH:mm:ss");

  // console.log(createdAt, modifiedAt, "bidif");

  // firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),

  return {
    modifiedAt:
      modifiedAt &&
      firebase.firestore.Timestamp.fromDate(modifiedAt.toJSDate()),
    createdAt:
      createdAt && firebase.firestore.Timestamp.fromDate(createdAt.toJSDate()),
    ranks: newRanking
  };
};

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const legacyUsers = await axios.get(
    "http://legacy.diktaattoriporssi.com/api/user"
  );

  const dictators = await environment.getEntries({
    content_type: "dictator"
  });

  const indexedDictators = indexBy(
    (d) => d.fields.legacyId.fi,
    filter((d) => d.fields.legacyId, dictators.items)
  );

  const users = legacyUsers.data.map((ld) => {
    const fucktoredRanking = fucktorRanking(ld.ranking, indexedDictators);

    return {
      secretName: ld.secretName,
      facebookId: ld.facebookId,
      email: ld.email,
      ranking: fucktoredRanking?.ranks,
      modifiedAt: fucktoredRanking?.modifiedAt,
      createdAt: fucktoredRanking?.modifiedAt,
      numberOfVotes: getNumberOfVotes(ld)
    };
  });

  for (const user of users) {
    console.log("PROCESSING", user.email);

    const identifier = user.email ? user.email : user.facebookId;
    const { email, facebookId, ...rest } = user;
    await firebase.firestore().collection("users").doc(identifier).set(rest);
  }

  return;
};

run();
