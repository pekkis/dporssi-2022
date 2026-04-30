import { useCallback } from "react";
import Youtube from "./Youtube";
import { nth } from "ramda";
import { FC, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import ukraineFlag from "./ukraine-flag.png";
import {
  arrow,
  arrowSlot,
  titleSlot,
  tubeNav,
  ukraineFlex,
  ukraineWrap
} from "./PropagandaTube.css";

const NormalVideo = ({ video, videos, setCurrent, hasLess, hasMore }) => {
  return (
    <>
      <Youtube videoId={video.videoId} />
      <div className={tubeNav}>
        <div className={arrowSlot}>
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            className={hasLess ? arrow.enabled : arrow.disabled}
          />
        </div>
        <div className={titleSlot}>
          {video.title}
          {video.nsfw === false && <span>[NSFW]</span>}
        </div>
        <div className={arrowSlot}>
          <FaChevronCircleRight
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            className={hasMore ? arrow.enabled : arrow.disabled}
          />
        </div>
      </div>
    </>
  );
};

const SupportUkraine = ({ videos, setCurrent, hasLess, hasMore }) => {
  return (
    <>
      <div className={ukraineWrap}>
        <div className={ukraineFlex}>
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
      <div className={tubeNav}>
        <div className={arrowSlot}>
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            className={hasLess ? arrow.enabled : arrow.disabled}
          />
        </div>
        <div className={titleSlot}>Ukrainan asia on meidän asiamme! Auta!</div>
        <div className={arrowSlot}>
          <FaChevronCircleRight
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            className={hasMore ? arrow.enabled : arrow.disabled}
          />
        </div>
      </div>
    </>
  );
};

type Props = {
  videos: {
    videoId: string;
    title: string;
    description?: string;
  }[];
};

const PropagandaTube: FC<Props> = ({ videos }) => {
  const [current, setCurrent] = useState(0);

  const setVideoIndex = useCallback(
    (index) => {
      setCurrent(index);
    },
    [setCurrent]
  );

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
        setCurrent={setVideoIndex}
      />
    );
  }

  return (
    <NormalVideo
      video={video}
      videos={videos}
      hasMore={hasMore}
      hasLess={hasLess}
      setCurrent={setVideoIndex}
    />
  );
};

export default PropagandaTube;
