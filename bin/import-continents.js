const contentful = require("contentful-management");
const util = require("util");
const axios = require("axios");
const { DateTime } = require("luxon");
const TurndownService = require("turndown");
const slugify = require("slugify");

const turndownService = new TurndownService();

const TYPE = "continent";

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const run = async () => {
  console.log(process.env);

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const legacyItems = await axios.get(
    `http://diktaattoriporssi.com/api/${TYPE}`
  );

  const items = await environment.getEntries({
    content_type: `${TYPE}`
  });

  console.log("Legacy items count", legacyItems.data.length);

  for (const li of legacyItems.data) {
    const i = items.items.find((item) => {
      return item.fields?.slug?.fi === slugify(li.canonicalName);
    });

    const fields = {
      slug: {
        fi: slugify(li.canonicalName)
      },
      name: {
        fi: li.name
      }
    };

    if (!i) {
      const i = await environment.createEntry(TYPE, {
        fields
      });
      await i.publish();

      console.log("Created...");
    } else {
      i.fields = fields;
      const i2 = await i.update();
      await i2.publish();
      console.log("Updated...");
    }
  }
};

run();
