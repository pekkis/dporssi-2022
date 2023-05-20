const contentful = require("contentful-management");
const util = require("util");
const axios = require("axios");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const TurndownService = require("turndown");

const turndownService = new TurndownService();

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const run = async () => {
  console.log(process.env);

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const legacyItems = await axios.get("http://diktaattoriporssi.com/api/tag");

  const items = await environment.getEntries({
    content_type: "tag"
  });

  console.log("Legacy items count", legacyItems.length);

  for (const li of legacyItems.data) {
    const i = items.items.find((item) => {
      return item.fields?.slug?.fi === slugify(li.tag);
    });

    // console.log(i);

    const fields = {
      slug: {
        fi: slugify(li.tag)
      },
      name: {
        fi: li.tag
      },
      description: {
        fi: turndownService.turndown(li.description)
      }
    };

    if (!i) {
      const i = await environment.createEntry("tag", {
        fields
      });
      console.log("Created a tag");
    } else {
      i.fields = fields;
      await i.update();
      console.log("Updated a tag");
    }
  }
};

run();
