import { Box, Heading } from "theme-ui";
import Markdown from "./Markdown";
import NextImage from "next/image";
import ContentfulImage from "./contentful/ContentfulImage";
import { FakeNewsItem, StaticImageData } from "../types";
import { createDate } from "../services/date";

type Props = {
  propaganda: FakeNewsItem;
  defaultImage: StaticImageData;
};

const PropagandaFull = (props: Props) => {
  const { propaganda, defaultImage } = props;

  const date = createDate(propaganda.date);

  return (
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
          <time dateTime={date.toISODate()}>{date.toLocaleString()}</time>
        </Box>

        <Box mt={3} sx={{ fontStyle: "italic " }}>
          <Markdown>{propaganda.description}</Markdown>
        </Box>
      </Box>

      <Box
        sx={{
          gridArea: "sidebar",
          alignSelf: "start"
        }}
      >
        {propaganda.image ? (
          <ContentfulImage
            data={propaganda.image}
            alt={propaganda.image.title}
          />
        ) : (
          <NextImage
            src={defaultImage.src}
            width={defaultImage.width}
            height={defaultImage.height}
          />
        )}
        {/*
            <GatsbyImage
              alt={propaganda.image ? propaganda.image.title : "kuvituskuva"}
              image={
                propaganda.image
                  ? propaganda.image.gatsbyImageData
                  : defaultImage.childImageSharp.gatsbyImageData
              }
            />
            */}
      </Box>

      <Box
        as="section"
        sx={{
          gridArea: "main"
        }}
      >
        <Markdown>{propaganda.article}</Markdown>
      </Box>
    </Box>
  );
};

export default PropagandaFull;
