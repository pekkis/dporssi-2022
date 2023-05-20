/** @jsxImportSource theme-ui */

import { Box, Flex } from "theme-ui";
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
      <Flex
        sx={{
          my: 1,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            fontSize: 4,
            alignSelf: "flex-start"
          }}
        >
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            sx={{
              cursor: hasLess ? "pointer" : "not-allowed",
              opacity: hasLess ? 1 : 0.2
            }}
          />
        </Box>
        <Box
          sx={{
            px: 2
          }}
        >
          {video.title}
          {video.nsfw === false && <span>[NSFW]</span>}
        </Box>
        <Box
          sx={{
            fontSize: 4,
            alignSelf: "flex-start"
          }}
        >
          <FaChevronCircleRight
            onClick={(e) => {
              console.log("hip hei?");
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            sx={{
              cursor: hasMore ? "pointer" : "not-allowed",
              opacity: hasMore ? 1 : 0.2
            }}
          />
        </Box>
      </Flex>
    </>
  );
};

const SupportUkraine = ({ videos, setCurrent, hasLess, hasMore }) => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,

          div: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
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
      <Flex
        sx={{
          my: 1,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            fontSize: 4,
            alignSelf: "flex-start"
          }}
        >
          <FaChevronCircleLeft
            title="Edellinen"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.max(current - 1, 0));
            }}
            sx={{
              cursor: hasLess ? "pointer" : "not-allowed",
              opacity: hasLess ? 1 : 0.2
            }}
          />
        </Box>
        <Box
          sx={{
            px: 2
          }}
        >
          Ukrainan asia on meidän asiamme! Auta!
        </Box>
        <Box
          sx={{
            fontSize: 4,
            alignSelf: "flex-start"
          }}
        >
          <FaChevronCircleRight
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrent((current) => Math.min(current + 1, videos.length - 1));
            }}
            title="Seuraava"
            sx={{
              cursor: hasMore ? "pointer" : "not-allowed",
              opacity: hasMore ? 1 : 0.2
            }}
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
