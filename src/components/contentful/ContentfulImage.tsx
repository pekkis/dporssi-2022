import { FC } from "react";
import { ContentfulImageData } from "@/types";
import { contentfulImage, contentfulPicture } from "./ContentfulImage.css";
import { cx } from "@/styles/cx";

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
  /**
   * Optional class name applied to the wrapping <div>. Use a vanilla-extract
   * `style()` call (or `sprinkles({ ... })`) here.
   */
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
    <div className={className}>
      <picture className={contentfulPicture}>
        <img
          loading={loading}
          className={contentfulImage}
          src={imageUrl}
          title={data.description}
          alt={alt}
        />
      </picture>
    </div>
  );
};

export default ContentfulImage;
