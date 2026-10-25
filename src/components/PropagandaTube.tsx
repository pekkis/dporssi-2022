import { Box, Flex } from "@/components/ui";
import * as styles from "./PropagandaTube.css";
import { useCallback } from "react";
import Youtube from "./Youtube";
import { nth } from "ramda";
import { FC, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

import ukraineFlag from "./ukraine-flag.png";

const NormalVideo = ({ video, videos, setCurrent, hasLess, hasMore }) => {
  return (
    <>
      <Youtube videoId={video.videoId} />
      <Flex className={styles.controls}>
        <Box className={styles.arrowBox}>
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            className={styles.arrow[hasLess ? "enabled" : "disabled"]}
          />
        </Box>
        <Box className={styles.caption}>
          {video.title}
          {video.nsfw === false && <span>[NSFW]</span>}
        </Box>
        <Box className={styles.arrowBox}>
          <FaChevronCircleRight
            onClick={(e) => {
              console.log("hip hei?");
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            className={styles.arrow[hasMore ? "enabled" : "disabled"]}
          />
        </Box>
      </Flex>
    </>
  );
};

const SupportUkraine = ({ videos, setCurrent, hasLess, hasMore }) => {
  return (
    <>
      <Box className={styles.flagFrame}>
        <Flex className={styles.flag}>
          <a
            rel="noreferrer"
            title="Auta Ukrainaa!"
            target="_blank"
            href="https://yle.fi/uutiset/3-12336799"
          >
            <img alt="Auta Ukrainaa!" src={ukraineFlag.src} width={150} />
          </a>
        </Flex>
      </Box>
      <Flex className={styles.controls}>
        <Box className={styles.arrowBox}>
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            className={styles.arrow[hasLess ? "enabled" : "disabled"]}
          />
        </Box>
        <Box className={styles.caption}>
          Ukrainan asia on meidän asiamme! Auta!
        </Box>
        <Box className={styles.arrowBox}>
          <FaChevronCircleRight
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            className={styles.arrow[hasMore ? "enabled" : "disabled"]}
          />
        </Box>
      </Flex>
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
