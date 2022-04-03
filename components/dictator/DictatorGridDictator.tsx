/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { navigate } from "../../services/backwards-compatibility";
import { FC } from "react";
import { Box } from "theme-ui";
import { Dictator } from "../../types";
// import { GatsbyImage } from "gatsby-plugin-image";
import InternalLink from "../InternalLink";
import { memo } from "react";
import { ExtraInfoComponent, Highlighter } from "../dictator-search/service";

type Props = {
  extraInfo: ExtraInfoComponent;
  fadeOutIf: Highlighter;
  dictator: Dictator;
};

const DictatorGridDictator: FC<Props> = ({
  extraInfo,
  fadeOutIf,
  dictator,
}) => {
  const ExtraInfoComponent = extraInfo;

  const isActive = fadeOutIf(dictator);
  const to = `/diktaattori/${dictator.slug}`;

  return (
    <Box
      sx={{
        cursor: "pointer",
        opacity: isActive ? 1 : 0.66,
        filter: isActive ? undefined : "grayscale(100%) sepia(50%)",
      }}
      key={dictator.id}
      onClick={() => {
        navigate(to);
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        {dictator.canonicalRanking && (
          <div
            sx={{
              fontSize: 1,
              textAlign: "center",
              width: "2em",
              margin: 0,
              position: "absolute",
              fontWeight: "strong",
              top: -1,
              right: -1,
              zIndex: 3,
              color: "white",
              backgroundColor: "link",
              borderRadius: 1,
              paddingY: "4px",
              /*
        textShadow:
          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
          */
            }}
          >
            {dictator.canonicalRanking}
          </div>
        )}
        <GatsbyImage
          image={dictator.primaryImage.gatsbyImageData}
          sx={{
            borderStyle: "solid",
            borderColor: "link",
            borderWidth: "1px",
            borderRadius: 1,
          }}
          alt={dictator.name}
        />
      </Box>
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Box>
          <InternalLink title={dictator.name} to={to}>
            {dictator.name}
          </InternalLink>
        </Box>
        <ExtraInfoComponent dictator={dictator} />
      </Box>
    </Box>
  );
};

export default memo(DictatorGridDictator);
