"use client";

import { FC } from "react";
import { Box } from "@/components/ui";
import * as styles from "./Youtube.css";
import ReactPlayer from "react-player";

type Props = {
  videoId: string;
};

/*
.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
*/

const Youtube: FC<Props> = ({ videoId }) => {
  return (
    <Box className={styles.frame}>
      <Box className={styles.player}>
        <ReactPlayer
          width="100%"
          height="100%"
          // react-player 3 takes the address in `src` (2.x had `url`).
          src={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </Box>
    </Box>
  );
};

export default Youtube;
