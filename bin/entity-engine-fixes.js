const contentful = require("contentful-management");
const util = require("util");
const path = require("path");
const axios = require("axios");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const fs = require("fs");

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

const initialFoundingDate = DateTime.fromISO("1999-12-24");
const antiSocialFoundingDate = DateTime.fromISO("2008-10-02");
const oldestGrandUpdateDate = DateTime.fromISO("2012-01-17");

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ADMIN_ACCESS_TOKEN
});

// \\\\\[lnk\\]

const replacer = (str) => {
  if (!str) {
    return str;
  }

  const links = str.match(/\[lnk\\\]/g);

  console.log("links", links, str);

  if (links) {
    throw new Error("link");
  }

  return str;
};

const theFix = (str) => {
  const fixed = replacer(str);

  return [fixed !== str, fixed];
};

const fix = (...str) => {
  return str.map(theFix);
};

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  /*
  const dictators = await environment.getEntries({
    content_type: "dictator"
  });
  */

  const guestbooks = await environment.getEntries({
    content_type: "guestbook"
  });

  /*
  const news = await environment.getEntries({
    content_type: "propaganda"
  });
  */

  for (const g of guestbooks.items) {
    const fixedScribbling = g.fields.scribbling.fi;

    const [scribbling, reply] = fix(
      g.fields.scribbling?.fi,
      g.fields.reply?.fi
    );

    console.log(scribbling, reply);
  }

  // const d2 = await d.update();
  // await d2.publish();
  // console.log("Published", k);

  /*
    const dictatore = indexedDictators[result.dictator.id];

    dictatore.fields.canonicalRanking = {
      fi: result.canonicalRanking
    };

    const dictatore2 = await dictatore.update();
    await dictatore2.publish();
  }
  */

  // yyyy-MM-dd
  // const now = DateTime.utc();

  /*
  const election = {
    calculatedAt: firebase.firestore.Timestamp.fromDate(now.toJSDate()),
    totalNumberOfVotes,
    results
  };
  */
};

run();
