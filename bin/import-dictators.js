const contentful = require("contentful-management");
const util = require("util");
const path = require("path");
const axios = require("axios");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const TurndownService = require("turndown");
const fs = require("fs");

const turndownService = new TurndownService();

const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const run = async () => {
  console.log(process.env);

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);

  const environment = await space.getEnvironment("master");

  const legacyDictators = await axios.get(
    "http://diktaattoriporssi.com/api/dictator"
  );

  const dictators = await environment.getEntries({
    content_type: "dictator"
  });

  /*
  const hitler = dictators.items.find(
    (d) => d.fields.slug.fi === "adolf-hitler"
  );
  console.log(hitler.fields.primaryImage);
  process.exit();
  */

  const tags = await environment.getEntries({
    content_type: "tag"
  });

  const countries = await environment.getEntries({
    content_type: "country"
  });

  for (const ld of legacyDictators.data) {
    // console.log(ld, "ld");

    console.log("Starting...", ld.canonicalName);

    const d = dictators.items.find((item) => {
      return item.fields.slug.fi === ld.canonicalName;
    });

    if (!d) {
      await environment.createEntry("dictator", {
        fields: {
          slug: {
            fi: ld.canonicalName
          },
          name: {
            fi: ld.identity.displayName
          }
        }
      });
    } else {
      if (true || !d.fields.primaryImage) {
        const piPath = path.resolve(
          "dictator-images",
          ld.canonicalName,
          `${ld.canonicalName}.jpg`
        );

        console.log(piPath);

        if (piPath) {
          try {
            const upload = await environment.createUpload({
              file: fs.readFileSync(piPath)
            });

            const asset = await environment.createAsset({
              fields: {
                title: {
                  fi: ld.identity.displayName
                },
                file: {
                  fi: {
                    fileName: `${ld.canonicalName}.jpg`,
                    contentType: "image/jpg",
                    uploadFrom: {
                      sys: {
                        type: "Link",
                        linkType: "Upload",
                        id: upload.sys.id
                      }
                    }
                  }
                }
              }
            });

            const asset2 = await asset.processForAllLocales();
            const asset3 = await asset2.publish();

            d.fields.primaryImage = {
              fi: {
                sys: {
                  type: "Link",
                  linkType: "Asset",
                  id: asset3.sys.id
                }
              }
            };
          } catch (e) {
            console.log("FAILURADO IMAGINADO");
          }
        }
      }

      const countryEntry = countries.items.find(
        (coi) => coi.fields.slug.fi === slugify(ld.country.canonicalName)
      );

      d.fields.country = {
        fi: {
          sys: { type: "Link", linkType: "Entry", id: countryEntry.sys.id }
        }
      };

      d.fields.synopsis = ld.synopsis
        ? {
            fi: turndownService.turndown(ld.synopsis)
          }
        : null;

      d.fields.story = ld.story
        ? {
            fi: turndownService.turndown(ld.story)
          }
        : null;

      d.fields.tags = {
        fi: ld.tags
          .map((tagStr) => {
            if (tagStr === "päätyi vankeuteen") {
              tagStr = "päätyi vankilaan";
            }

            const tagEntry = tags.items.find(
              (tag) => tag.fields.slug.fi === slugify(tagStr)
            );

            if (!tagEntry) {
              console.warn("Did not find tag", tagStr);
              return undefined;
            }

            return {
              sys: { type: "Link", linkType: "Entry", id: tagEntry.sys.id }
            };
          })
          .filter((t) => t)
      };

      const reignStart = DateTime.fromISO(ld.reign.start);

      if (ld.canonicalRanking) {
        d.fields.canonicalRanking = {
          fi: ld.canonicalRanking
        };
      }

      if (ld.naughtiness.hitlers) {
        d.fields.naughtiness = {
          fi: parseInt(ld.naughtiness.hitlers * 100000)
        };
      }

      d.fields.reignStart = {
        fi: reignStart.toFormat("yyyy-LL-dd")
      };

      if (ld.reign.end) {
        d.fields.reignEnd = {
          fi: DateTime.fromISO(ld.reign.end).toFormat("yyyy-LL-dd")
        };
      }

      console.log(d.fields, "fiilds");

      const d2 = await d.update();
      await d2.publish();
      console.log(`Updated`, ld.canonicalName);

      // throw new Error("poopoo");

      // d.update()

      // process.exit();
    }
  }

  return;

  /*
  const dictators = await environment.getEntries({
    content_type: "dictator",
    limit: 1000
  });
  */

  const d = environment.getEntries({
    content_type: "dictator"
  });

  console.log(util.inspect(dictators, false, 555));

  // dictators.console.log(environment);
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
