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

const both = (d) => ({
  listedAt: d,
  majorStoryUpdateAt: d
});

const initial = (slug) => {
  return [
    slug,
    {
      listedAt: initialFoundingDate,
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ];
};

const data = new Map([
  [
    "adolf-hitler",
    {
      listedAt: initialFoundingDate,
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "josif-stalin",
    {
      listedAt: initialFoundingDate,
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "pol-pot",
    {
      listedAt: initialFoundingDate,
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "kim-il-sung",
    {
      listedAt: initialFoundingDate,
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "saparmurat-nijazov",
    {
      listedAt: DateTime.fromISO("2004-08-29"),
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "francisco-solano-lopez",
    {
      listedAt: DateTime.fromISO("2006-12-21"),
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "kim-jong-il",
    {
      listedAt: antiSocialFoundingDate,
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "kim-jong-un",
    {
      ...both(DateTime.fromISO("2014-07-08"))
    }
  ],
  [
    "ali-soilih",
    {
      ...both(DateTime.fromISO("2014-07-15"))
    }
  ],
  [
    "roman-von-ungern-sternberg",
    {
      ...both(DateTime.fromISO("2014-07-20"))
    }
  ],
  [
    "manuel-noriega",
    {
      ...both(DateTime.fromISO("2014-07-24"))
    }
  ],
  [
    "anastasio-somoza-garcia",
    {
      ...both(DateTime.fromISO("2014-07-27"))
    }
  ],
  [
    "anastasio-somoza-debayle",
    {
      ...both(DateTime.fromISO("2014-07-27"))
    }
  ],
  [
    "luis-somoza-debayle",
    {
      ...both(DateTime.fromISO("2014-07-27"))
    }
  ],
  [
    "robert-mugabe",
    {
      ...both(DateTime.fromISO("2014-08-01"))
    }
  ],
  [
    "ramfis-trujillo",
    {
      ...both(DateTime.fromISO("2014-08-05"))
    }
  ],
  [
    "fulgencio-batista",
    {
      ...both(DateTime.fromISO("2020-12-15"))
    }
  ],
  [
    "teodoro-obiang-nguema-mbasogo",
    {
      ...both(DateTime.fromISO("2020-12-16"))
    }
  ],
  [
    "siad-barre",
    {
      ...both(DateTime.fromISO("2020-12-22"))
    }
  ],
  [
    "mengistu-haile-mariam",
    {
      ...both(DateTime.fromISO("2020-12-29"))
    }
  ],
  [
    "isaias-afewerki",
    {
      ...both(DateTime.fromISO("2021-06-27"))
    }
  ],
  [
    "samuel-doe",
    {
      ...both(DateTime.fromISO("2021-07-01"))
    }
  ],
  initial("jean-bedel-bokassa"),
  initial("mao-zedong"),
  initial("idi-amin"),
  initial("mobutu-sese-seko"),
  initial("saddam-hussein"),
  initial("nicolae-ceausescu"),
  initial("francois-duvalier"),
  initial("augusto-pinochet"),
  initial("fidel-castro"),
  initial("muammar-gaddafi"),
  initial("benito-mussolini"),
  initial("ruhollah-khomeini"),
  initial("slobodan-milosevic"),
  initial("francisco-franco"),
  initial("tito"),
  [
    "jean-claude-duvalier",
    {
      listedAt: antiSocialFoundingDate,
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "macias-nguema",
    {
      listedAt: DateTime.fromISO("2000-03-01"),
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "rafael-trujillo",
    {
      listedAt: DateTime.fromISO("2001-01-01"),
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "alfredo-stroessner",
    {
      listedAt: DateTime.fromISO("2000-08-01"),
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "enver-hoxha",
    {
      listedAt: DateTime.fromISO("2000-05-01"),
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ],
  [
    "haile-selassie",
    {
      listedAt: DateTime.fromISO("2000-10-01"),
      majorStoryUpdateAt: oldestGrandUpdateDate
    }
  ]
]);

// 22.12.2020

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const dictators = await environment.getEntries({
    content_type: "dictator"
  });

  const ranked = filter((d) => d.fields.canonicalRanking?.fi, dictators.items);

  const indexedDictators = indexBy((d) => d.fields.slug.fi, ranked);

  for (const [k, v] of data.entries()) {
    const d = indexedDictators[k];

    if (v.listedAt) {
      d.fields.listedAt = {
        fi: v.listedAt.toFormat("yyyy-LL-dd")
      };
    }

    if (v.majorStoryUpdateAt) {
      d.fields.majorStoryUpdateAt = {
        fi: v.majorStoryUpdateAt.toFormat("yyyy-LL-dd")
      };
    }

    const d2 = await d.update();
    await d2.publish();
    console.log("Published", k);
  }

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
