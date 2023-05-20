/** @jsxImportSource theme-ui */

import { FC } from "react";
import NextImage from "next/image";
import { ContentfulImageData } from "@/types";
import { Box, ThemeUIStyleObject } from "theme-ui";

type ContentfulConfig = {
  width?: number;
  aspectRatio?: number;
  fit?: string;
  focus?: string;
  quality?: number;
};

const urlParamsFromConfig = (config: ContentfulConfig): URLSearchParams => {
  const urlParams = new URLSearchParams();

  if (config.width) {
    urlParams.set("w", config.width.toString());

    if (config.aspectRatio) {
      const h = Math.round(config.width / config.aspectRatio);

      urlParams.set("h", h.toString());
    }
  }

  if (config.fit) {
    urlParams.set("fit", config.fit);
  }

  if (config.focus) {
    urlParams.set("f", config.focus);
  }

  if (config.quality) {
    urlParams.set("q", config.quality.toString());
  }

  return urlParams;
};

type Props = {
  data: ContentfulImageData;
  alt: string;
  styles?: ThemeUIStyleObject;
  config?: ContentfulConfig;
  loading?: "lazy" | "eager";
};

const ContentfulImage: FC<Props> = ({
  data,
  alt,
  styles,
  config = {},
  loading = "lazy"
}) => {
  const urlParams = urlParamsFromConfig(config);

  const imageUrl = `${data.url}?${urlParams.toString()}`;

  return (
    <Box sx={styles}>
      <picture
        sx={{
          display: "block",
          maxWidth: "100%"
        }}
      >
        <img
          loading={loading}
          sx={{
            display: "block",
            maxWidth: "100%"
          }}
          src={imageUrl}
          title={data.title}
          alt={alt}
        />
      </picture>
    </Box>
  );
};

export default ContentfulImage;
