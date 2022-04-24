import { FC } from "react";
import { Box } from "theme-ui";
import ReactPlayer from "react-player";

type Props = {
  videoId: string;
};

/*
.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
*/

const Youtube: FC<Props> = ({ videoId }) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </Box>
    </Box>
  );
};

export default Youtube;
