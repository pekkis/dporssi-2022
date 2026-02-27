import Youtube from "./Youtube";
import { nth } from "ramda";
import { FC, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import ukraineFlag from "./ukraine-flag.png";

type NormalVideoItem = {
  videoId: string;
  title: string;
  description?: string;
  nsfw?: boolean;
  ukraine?: false;
};

type UkraineVideo = { ukraine: true };

export type VideoItem = NormalVideoItem | UkraineVideo;

type SharedNavProps = {
  videos: VideoItem[];
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  hasLess: boolean;
  hasMore: boolean;
};

type NormalVideoComponentProps = SharedNavProps & {
  video: NormalVideoItem;
};

const NormalVideo = ({
  video,
  videos,
  setCurrent,
  hasLess,
  hasMore
}: NormalVideoComponentProps) => {
  return (
    <>
      <Youtube videoId={video.videoId} />
      <div className="my-1 w-full flex justify-between items-center">
        <div className="text-2xl self-start">
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            style={{
              cursor: hasLess ? "pointer" : "not-allowed",
              opacity: hasLess ? 1 : 0.2
            }}
          />
        </div>
        <div className="px-2">
          {video.title}
          {video.nsfw === false && <span>[NSFW]</span>}
        </div>
        <div className="text-2xl self-start">
          <FaChevronCircleRight
            onClick={(e) => {
              console.log("hip hei?");
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            style={{
              cursor: hasMore ? "pointer" : "not-allowed",
              opacity: hasMore ? 1 : 0.2
            }}
          />
        </div>
      </div>
    </>
  );
};

const SupportUkraine = ({
  videos,
  setCurrent,
  hasLess,
  hasMore
}: SharedNavProps) => {
  return (
    <>
      <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
        <div className="flex items-center justify-center absolute inset-0">
          <a
            rel="noreferrer"
            title="Auta Ukrainaa!"
            target="_blank"
            href="https://yle.fi/uutiset/3-12336799"
          >
            <img alt="Auta Ukrainaa!" src={ukraineFlag.src} width={150} />
          </a>
        </div>
      </div>
      <div className="my-1 w-full flex justify-between items-center">
        <div className="text-2xl self-start">
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            style={{
              cursor: hasLess ? "pointer" : "not-allowed",
              opacity: hasLess ? 1 : 0.2
            }}
          />
        </div>
        <div className="px-2">Ukrainan asia on meidän asiamme! Auta!</div>
        <div className="text-2xl self-start">
          <FaChevronCircleRight
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            style={{
              cursor: hasMore ? "pointer" : "not-allowed",
              opacity: hasMore ? 1 : 0.2
            }}
          />
        </div>
      </div>
    </>
  );
};

type Props = {
  videos: VideoItem[];
};

const PropagandaTube: FC<Props> = ({ videos }) => {
  const [current, setCurrent] = useState(0);

  const video = nth(current, videos);

  if (!video) {
    return null;
  }

  const hasMore = current + 1 < videos.length;
  const hasLess = current > 0;

  if (video.ukraine === true) {
    return (
      <SupportUkraine
        videos={videos}
        hasMore={hasMore}
        hasLess={hasLess}
        setCurrent={setCurrent}
      />
    );
  }

  return (
    <NormalVideo
      video={video}
      videos={videos}
      hasMore={hasMore}
      hasLess={hasLess}
      setCurrent={setCurrent}
    />
  );
};

export default PropagandaTube;
