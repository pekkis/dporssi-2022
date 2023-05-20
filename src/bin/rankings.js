const contentful = require("contentful-management");
const util = require("util");
const path = require("path");
const axios = require("axios");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const TurndownService = require("turndown");
const fs = require("fs");

const { take, drop, takeLast, groupBy, head, indexBy } = require("ramda");

const turndownService = new TurndownService();

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ADMIN_ACCESS_TOKEN
});

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const dictators = await environment.getEntries({
    content_type: "dictator"
  });

  const groupedDictators = indexBy((d) => d.sys.id, dictators.items);

  const pekkisRanking = await environment.getEntries({
    content_type: "ranking",
    fields: { author: "pekkis" }
  });

  if (pekkisRanking.total !== 1) {
    throw new Error("OH NOES!");
  }

  const theRanking = head(pekkisRanking.items);

  const ranked = theRanking.fields.dictators.fi.map((rank, i) => [
    groupedDictators[rank.sys.id],
    i
  ]);

  for (const [d, i] of ranked) {
    const canonicalRanking = i + 1;
    console.log(
      "Setting canonical ranking",
      canonicalRanking,
      d.fields.name.fi
    );

    d.fields.canonicalRanking = { fi: canonicalRanking };
    const d2 = await d.update();
    await d2.publish();
  }
};

run();

/*
// This API call will request a space with the specified ID
client.getSpace('spaceId').then((space) => {
  // Now that we have a space, we can get entries from that space
  space.getEntries().then((entries) => {
    console.log(entries.items)
  })

  // let's get a content type
  space.getContentType('product').then((contentType) => {
    // and now let's update its name
    contentType.name = 'New Product'
    contentType.update().then((updatedContentType) => {
      console.log('Update was successful')
    })
  })
})
*/
