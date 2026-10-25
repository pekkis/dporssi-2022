import { FC } from "react";
import { Box } from "@/components/ui";
import * as styles from "./DictatorGridDictator.css";
import { Dictator } from "@/types";
// import { GatsbyImage } from "gatsby-plugin-image";
import InternalLink from "@/components/InternalLink";
import { memo } from "react";
import {
  ExtraInfoComponent,
  Highlighter
} from "@/components/dictator-search/service";
import Image from "@/components/contentful/ContentfulImage";

type Props = {
  extraInfo: ExtraInfoComponent;
  fadeOutIf: Highlighter;
  dictator: Dictator;
};

const DictatorGridDictator: FC<Props> = ({
  extraInfo,
  fadeOutIf,
  dictator
}) => {
  const ExtraInfoComponent = extraInfo;

  const isActive = fadeOutIf(dictator);
  const to = `/diktaattori/${dictator.slug}`;

  return (
    <Box className={styles.state[isActive ? "active" : "faded"]}>
      <Box className={styles.imageBox}>
        {dictator.canonicalRanking && (
          <div className={styles.ranking}>{dictator.canonicalRanking}</div>
        )}
        <Image
          data={dictator.primaryImage}
          config={{ width: 150, aspectRatio: 0.75, fit: "fill", focus: "face" }}
          className={styles.image}
          alt={dictator.name}
        />
      </Box>
      <Box className={styles.caption}>
        <Box>
          <InternalLink
            title={dictator.name}
            to={to}
            className={styles.cardLink}
          >
            {dictator.name}
          </InternalLink>
        </Box>
        <ExtraInfoComponent dictator={dictator} />
      </Box>
    </Box>
  );
};

export default memo(DictatorGridDictator);

/*
layout: CONSTRAINED
            formats: [AUTO, WEBP]
            cropFocus: FACE
            aspectRatio: 0.75
            placeholder: BLURRED
            resizingBehavior: FILL
            quality: 60
            width: 150
*/
