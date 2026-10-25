import { FC } from "react";
import { ContentfulImageData } from "@/types";
import { Box } from "@/components/ui";
import * as styles from "./ContentfulImage.css";

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
  className?: string;
  config?: ContentfulConfig;
  loading?: "lazy" | "eager";
};

const ContentfulImage: FC<Props> = ({
  data,
  alt,
  className,
  config = {},
  loading = "lazy"
}) => {
  const urlParams = urlParamsFromConfig(config);

  const imageUrl = `${data.url}?${urlParams.toString()}`;

  return (
    <Box className={className}>
      <picture className={styles.picture}>
        <img
          loading={loading}
          className={styles.image}
          src={imageUrl}
          title={data.description ?? undefined}
          alt={alt}
        />
      </picture>
    </Box>
  );
};

export default ContentfulImage;
