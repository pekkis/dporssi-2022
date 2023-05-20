const contentful = require("contentful-management");
const util = require("util");
const path = require("path");
const axios = require("axios");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const TurndownService = require("turndown");
const fs = require("fs");

const { take, drop, takeLast, indexBy } = require("ramda");

const turndownService = new TurndownService();

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const switcheroos = { "mohammed-reza-pahlavi": "mohammad-reza-pahlavi" };

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const legacyDictators = await axios.get(
    "http://legacy.diktaattoriporssi.com/api/dictator"
  );

  const dictators = await environment.getEntries({
    content_type: "dictator"
  });

  const indexedDictators = indexBy((d) => d.fields.slug.fi, dictators.items);

  for (const ld of legacyDictators.data) {
    const bibbidi = switcheroos[ld.canonicalName]
      ? switcheroos[ld.canonicalName]
      : ld.canonicalName;

    console.log("PROCESSING", ld.canonicalName);

    const d = indexedDictators[bibbidi];
    if (d) {
      console.log("\tFOUND...", d.sys.id);

      d.fields.legacyId = {
        fi: ld.id
      };

      d.fields.legacyUuid = {
        fi: ld.uuid
      };

      const d2 = await d.update();
      await d2.publish();
    }
  }
  // console.log(indexedDictators);

  /*
    const d2 = await dictator.update();
    await d2.publish();
    */
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
