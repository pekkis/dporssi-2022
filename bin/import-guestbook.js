const contentful = require("contentful-management");
const util = require("util");
const axios = require("axios");
const { DateTime } = require("luxon");
const TurndownService = require("turndown");
const slugify = require("slugify");

const turndownService = new TurndownService();

const TYPE = "guestbook";

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

  for (const li of legacyItems.data) {
    const dt = DateTime.fromISO(li.publishDate);

    const fields = {
      author: {
        fi: li.author
      },
      date: {
        fi: dt.toISO()
      },
      scribbling: li.scribbling
        ? {
            fi: turndownService.turndown(li.scribbling)
          }
        : null,
      reply: li.reply
        ? {
            fi: turndownService.turndown(li.reply)
          }
        : null
    };

    console.log(fields, "fiilds");

    const i = await environment.createEntry(TYPE, {
      fields
    });
    await i.publish();
    console.log("Created...");
  }
};

run();
