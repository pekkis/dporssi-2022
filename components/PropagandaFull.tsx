import React from "react";
import { DateTime } from "luxon";
import { Box, Heading } from "theme-ui";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import Markdown from "./Markdown";

type Propaganda = {
  title: string;
  date: string;
  slug: string;
  description: {
    description: string;
  };
  article: {
    article: string;
  };
  image?: {
    title: string;
    gatsbyImageData: IGatsbyImageData;
  };
};

type Props = {
  propaganda: Propaganda;
  defaultImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

const PropagandaFull = (props: Props) => {
  const { propaganda, defaultImage } = props;

  const date = DateTime.fromISO(propaganda.date)
    .setLocale("fi")
    .setZone("Europe/Helsinki");

  return (
    <Box mx={2}>
      <Box
        as="article"
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: ["1fr", "2fr 1fr"],
          gridTemplateAreas: [
            `
            "header"
            "sidebar"
            "main"
          `,
            `
          "header header"
          "main sidebar"
        `
          ]
        }}
      >
        <Box
          as="header"
          sx={{
            gridArea: "header"
          }}
        >
          <Heading mb={0} as="h2">
            {propaganda.title}
          </Heading>
          <Box mt={1}>
            Julkaistu{" "}
            <time dateTime={date.toISODate()}>
              {date.toLocaleString({ locale: "fi" })}
            </time>
          </Box>

          <Box mt={3} sx={{ fontStyle: "italic " }}>
            <Markdown>{propaganda.description.description}</Markdown>
          </Box>
        </Box>

        <Box
          sx={{
            gridArea: "sidebar",
            alignSelf: "start"
          }}
        >
          {
            <GatsbyImage
              alt={propaganda.image ? propaganda.image.title : "kuvituskuva"}
              image={
                propaganda.image
                  ? propaganda.image.gatsbyImageData
                  : defaultImage.childImageSharp.gatsbyImageData
              }
            />
          }
        </Box>

        <Box
          as="section"
          sx={{
            gridArea: "main"
          }}
        >
          <Markdown>{propaganda.article.article}</Markdown>
        </Box>
      </Box>
    </Box>
  );
};

export default PropagandaFull;
