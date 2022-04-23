const contentful = require("contentful-management");
const util = require("util");
const path = require("path");
const axios = require("axios");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const fs = require("fs");
const firebase = require("firebase-admin");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const {
  take,
  drop,
  takeLast,
  groupBy,
  head,
  indexBy,
  repeat,
  mapObjIndexed,
  values,
  pipe,
  sortWith,
  descend,
  ascend,
  prop,
  filter,
  addIndex,
  map
} = require("ramda");

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ADMIN_ACCESS_TOKEN
});

firebase.initializeApp();

firebase.firestore().settings({
  ignoreUndefinedProperties: true
});

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const dictators = await environment.getEntries({
    content_type: "dictator"
  });

  const indexedDictators = indexBy((d) => d.sys.id, dictators.items);

  const firestore = firebase.firestore();

  const users = await firestore.collection("users").get();

  const userz = users.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id
    };
  });

  console.log(`Fetched ${userz.length} users`);

  const voters = userz.filter((voter) => voter.ranking);

  console.log(`Fetched ${voters.length} voters`);

  const totalNumberOfVotes = voters.reduce((a, v) => a + v.numberOfVotes, 0);

  console.log("Dictators are indexed");

  const votes = voters
    .map((voter) => {
      const votePerDictator = voter.ranking.map((id, index) => {
        return {
          id,
          ranking: index + 1
        };
      });
      return votePerDictator
        .map((vote) => repeat(vote, voter.numberOfVotes))
        .flat();
    })
    .flat();

  console.log(`Counted ${votes.length} votes`);

  // const groupedResults = mapObjIndexed(, groupedVotes);

  const sortByRanking = sortWith([ascend(prop("ranking"))]);

  const indexedMap = addIndex(map);

  const results = pipe(
    groupBy((vote) => vote.id),
    mapObjIndexed((votes, i) => {
      const d = indexedDictators[i];

      if (!d) {
        throw new Error("Oh noes");
      }

      return {
        dictator: {
          id: d.sys.id,
          slug: d.fields.slug.fi,
          name: d.fields.name.fi
        },
        numberOfVotes: votes.length,
        ranking: votes.reduce((a, v) => a + v.ranking, 0) / votes.length
      };
    }),
    values,
    filter((result) => result.numberOfVotes >= 0.5 * totalNumberOfVotes),
    sortByRanking,
    indexedMap((result, i) => ({
      ...result,
      canonicalRanking: i + 1
    }))
  )(votes);

  for (const result of results) {
    console.log(
      "SETTING CANONICAL RANKING",
      result.dictator.name,
      result.canonicalRanking
    );

    const dictatore = indexedDictators[result.dictator.id];

    dictatore.fields.canonicalRanking = {
      fi: result.canonicalRanking
    };

    const dictatore2 = await dictatore.update();
    await dictatore2.publish();
  }

  // yyyy-MM-dd
  const now = DateTime.utc();

  const election = {
    calculatedAt: firebase.firestore.Timestamp.fromDate(now.toJSDate()),
    totalNumberOfVotes,
    results
  };

  await firestore
    .collection("elections")
    .doc(now.toFormat("yyyy-MM-dd"))
    .set(election);

  console.log(`Election result saved.`, now.toFormat("yyyy-MM-dd"));
};

run();
