const contentful = require("contentful-management");
const util = require("util");
const path = require("path");
const axios = require("axios");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const TurndownService = require("turndown");
const fs = require("fs");

const { take, drop, takeLast } = require("ramda");

const turndownService = new TurndownService();

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const run = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const dictators = await environment.getEntries({
    content_type: "dictator"
  });

  for (const dictator of dictators.items) {
    const originalName = dictator.fields.name.fi;

    const name = originalName.split(" ");

    let sortName;

    if (
      [
        "Tito",
        "Pol Pot",
        "Suharto",
        "Haile Selassie",
        "Mobutu Sese Seko"
      ].includes(originalName)
    ) {
      sortName = originalName;
    } else {
      const firstName = take(1, name).join(" ");
      const lastName = drop(1, name).join(" ");

      if (["Kim", "Mao", "Jiang"].includes(firstName)) {
        sortName = `${firstName}, ${lastName}`;
      } else {
        sortName = `${lastName}, ${firstName}`;
      }
    }

    dictator.fields.sortName = {
      fi: sortName
    };

    const d2 = await dictator.update();
    await d2.publish();
  }

  return;
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
