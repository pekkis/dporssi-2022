import { FC } from "react";
import { ContentfulImageData } from "@/types";

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
    <picture className={`block max-w-full ${className || ""}`}>
      <img
        loading={loading}
        className="block max-w-full"
        src={imageUrl}
        title={data.description}
        alt={alt}
      />
    </picture>
  );
};

export default ContentfulImage;
